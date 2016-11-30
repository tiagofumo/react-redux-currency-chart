require 'test/unit'
require 'date'
require_relative 'cron'

class TestCron < Test::Unit::TestCase
  def test_last_n_dates
    today = Date.today
    assert_equal([today -3, today -2, today -1, today], last_n_dates(4))
    assert_equal([today -2, today -1, today], last_n_dates(3))
  end

  def test_load_quotes_by_date
    # should use a mocked version of the laod_quotes_by_date method
    assert_equal({
      "USDBRL" => 3.422041,
      "USDARS" => 15.538041,
      "USDEUR" => 0.943804
    }, load_quotes_by_date(Date.new(2016, 11, 25)))
    future_date = Date.today + 5
    assert_raise "Couldn't load quote for date #{future_date}" do
      load_quotes_by_date(future_date)
    end
  end

  def test_format_quotes
    quotes = {
      'USDBRL' => 3.4082,
      'USDARS' => 15.539,
      'USDEUR' => 0.9413
    }
    result = {
      'usd' => 3.4082,
      'ars' => 0.2193,
      'eur' => 3.6207
    }
    assert_equal(result, format_quotes(quotes))
  end
end
