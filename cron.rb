require 'date'
require 'json'
require 'open-uri'
require 'yaml'

def relative_path(path)
  File.join __dir__, path
end

$config = YAML.load_file relative_path('config.yml')

def last_n_dates(n)
  d = Date.today
  (0..(n-1)).to_a.reverse.map { |i| d - i }
end

def load_quotes_by_date(date)
  url = 'http://apilayer.net/api/historical?'\
    "access_key=#{$config['access_key']}&"\
    "date=#{date}&currencies=BRL,ARS,EUR&format=1"
  json = JSON.load open(url)
  raise "Couldn't load quote for date #{date}" if !json['success']
  json['quotes']
end

def format_quotes(quotes)
  return quotes if !quotes
  usd = quotes['USDBRL']
  quotes.inject({}) do |output, (currency, quote)|
    key = currency.downcase.sub('usd', '').sub('brl', 'usd')
    val = key == 'usd' ? quote : usd/quote
    output[key] = val.round(4)
    output
  end
end

def load_data_into_json(file_name)
  file_path = relative_path file_name
  quotes_by_date = JSON.parse File.read(file_path)
  quotes_by_date.delete Date.today.strftime('%Y%m%d')
  quotes_dates = quotes_by_date.keys
  missing_dates = last_n_dates(7).select do |i|
    !quotes_dates.include? i.strftime('%Y%m%d')
  end
  missing_dates.inject(quotes_by_date) do |hash, date|
    hash[date.strftime('%Y%m%d')] = format_quotes load_quotes_by_date(date)
    hash
  end
  File.write file_path, JSON.pretty_generate(quotes_by_date)
end

load_data_into_json($config['json_file_path'])

