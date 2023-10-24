const countries = [
  {
    "id": 1,
    "currency": "AFN",
    "name": "Afghanistan",
    "latitude": "33.00000000",
    "longitude": "65.00000000",
    "emoji": "🇦🇫",
    "emojiU": "U+1F1E6 U+1F1EB"
  },
  {
    "id": 2,
    "currency": "EUR",
    "name": "Aland Islands",
    "latitude": "60.11666700",
    "longitude": "19.90000000",
    "emoji": "🇦🇽",
    "emojiU": "U+1F1E6 U+1F1FD"
  },
  {
    "id": 3,
    "currency": "ALL",
    "name": "Albania",
    "latitude": "41.00000000",
    "longitude": "20.00000000",
    "emoji": "🇦🇱",
    "emojiU": "U+1F1E6 U+1F1F1"
  },
  {
    "id": 4,
    "currency": "DZD",
    "name": "Algeria",
    "latitude": "28.00000000",
    "longitude": "3.00000000",
    "emoji": "🇩🇿",
    "emojiU": "U+1F1E9 U+1F1FF"
  },
  {
    "id": 5,
    "currency": "USD",
    "name": "American Samoa",
    "latitude": "-14.33333333",
    "longitude": "-170.00000000",
    "emoji": "🇦🇸",
    "emojiU": "U+1F1E6 U+1F1F8"
  },
  {
    "id": 6,
    "currency": "EUR",
    "name": "Andorra",
    "latitude": "42.50000000",
    "longitude": "1.50000000",
    "emoji": "🇦🇩",
    "emojiU": "U+1F1E6 U+1F1E9"
  },
  {
    "id": 7,
    "currency": "AOA",
    "name": "Angola",
    "latitude": "-12.50000000",
    "longitude": "18.50000000",
    "emoji": "🇦🇴",
    "emojiU": "U+1F1E6 U+1F1F4"
  },
  {
    "id": 8,
    "currency": "XCD",
    "name": "Anguilla",
    "latitude": "18.25000000",
    "longitude": "-63.16666666",
    "emoji": "🇦🇮",
    "emojiU": "U+1F1E6 U+1F1EE"
  },
  {
    "id": 9,
    "currency": "AAD",
    "name": "Antarctica",
    "latitude": "-74.65000000",
    "longitude": "4.48000000",
    "emoji": "🇦🇶",
    "emojiU": "U+1F1E6 U+1F1F6"
  },
  {
    "id": 10,
    "currency": "XCD",
    "name": "Antigua And Barbuda",
    "latitude": "17.05000000",
    "longitude": "-61.80000000",
    "emoji": "🇦🇬",
    "emojiU": "U+1F1E6 U+1F1EC"
  },
  {
    "id": 11,
    "currency": "ARS",
    "name": "Argentina",
    "latitude": "-34.00000000",
    "longitude": "-64.00000000",
    "emoji": "🇦🇷",
    "emojiU": "U+1F1E6 U+1F1F7"
  },
  {
    "id": 12,
    "currency": "AMD",
    "name": "Armenia",
    "latitude": "40.00000000",
    "longitude": "45.00000000",
    "emoji": "🇦🇲",
    "emojiU": "U+1F1E6 U+1F1F2"
  },
  {
    "id": 13,
    "currency": "AWG",
    "name": "Aruba",
    "latitude": "12.50000000",
    "longitude": "-69.96666666",
    "emoji": "🇦🇼",
    "emojiU": "U+1F1E6 U+1F1FC"
  },
  {
    "id": 14,
    "currency": "AUD",
    "name": "Australia",
    "latitude": "-27.00000000",
    "longitude": "133.00000000",
    "emoji": "🇦🇺",
    "emojiU": "U+1F1E6 U+1F1FA"
  },
  {
    "id": 15,
    "currency": "EUR",
    "name": "Austria",
    "latitude": "47.33333333",
    "longitude": "13.33333333",
    "emoji": "🇦🇹",
    "emojiU": "U+1F1E6 U+1F1F9"
  },
  {
    "id": 16,
    "currency": "AZN",
    "name": "Azerbaijan",
    "latitude": "40.50000000",
    "longitude": "47.50000000",
    "emoji": "🇦🇿",
    "emojiU": "U+1F1E6 U+1F1FF"
  },
  {
    "id": 17,
    "currency": "BSD",
    "name": "The Bahamas",
    "latitude": "24.25000000",
    "longitude": "-76.00000000",
    "emoji": "🇧🇸",
    "emojiU": "U+1F1E7 U+1F1F8"
  },
  {
    "id": 18,
    "currency": "BHD",
    "name": "Bahrain",
    "latitude": "26.00000000",
    "longitude": "50.55000000",
    "emoji": "🇧🇭",
    "emojiU": "U+1F1E7 U+1F1ED"
  },
  {
    "id": 19,
    "currency": "BDT",
    "name": "Bangladesh",
    "latitude": "24.00000000",
    "longitude": "90.00000000",
    "emoji": "🇧🇩",
    "emojiU": "U+1F1E7 U+1F1E9"
  },
  {
    "id": 20,
    "currency": "BBD",
    "name": "Barbados",
    "latitude": "13.16666666",
    "longitude": "-59.53333333",
    "emoji": "🇧🇧",
    "emojiU": "U+1F1E7 U+1F1E7"
  },
  {
    "id": 21,
    "currency": "BYN",
    "name": "Belarus",
    "latitude": "53.00000000",
    "longitude": "28.00000000",
    "emoji": "🇧🇾",
    "emojiU": "U+1F1E7 U+1F1FE"
  },
  {
    "id": 22,
    "currency": "EUR",
    "name": "Belgium",
    "latitude": "50.83333333",
    "longitude": "4.00000000",
    "emoji": "🇧🇪",
    "emojiU": "U+1F1E7 U+1F1EA"
  },
  {
    "id": 23,
    "currency": "BZD",
    "name": "Belize",
    "latitude": "17.25000000",
    "longitude": "-88.75000000",
    "emoji": "🇧🇿",
    "emojiU": "U+1F1E7 U+1F1FF"
  },
  {
    "id": 24,
    "currency": "XOF",
    "name": "Benin",
    "latitude": "9.50000000",
    "longitude": "2.25000000",
    "emoji": "🇧🇯",
    "emojiU": "U+1F1E7 U+1F1EF"
  },
  {
    "id": 25,
    "currency": "BMD",
    "name": "Bermuda",
    "latitude": "32.33333333",
    "longitude": "-64.75000000",
    "emoji": "🇧🇲",
    "emojiU": "U+1F1E7 U+1F1F2"
  },
  {
    "id": 26,
    "currency": "BTN",
    "name": "Bhutan",
    "latitude": "27.50000000",
    "longitude": "90.50000000",
    "emoji": "🇧🇹",
    "emojiU": "U+1F1E7 U+1F1F9"
  },
  {
    "id": 27,
    "currency": "BOB",
    "name": "Bolivia",
    "latitude": "-17.00000000",
    "longitude": "-65.00000000",
    "emoji": "🇧🇴",
    "emojiU": "U+1F1E7 U+1F1F4"
  },
  {
    "id": 28,
    "currency": "BAM",
    "name": "Bosnia and Herzegovina",
    "latitude": "44.00000000",
    "longitude": "18.00000000",
    "emoji": "🇧🇦",
    "emojiU": "U+1F1E7 U+1F1E6"
  },
  {
    "id": 29,
    "currency": "BWP",
    "name": "Botswana",
    "latitude": "-22.00000000",
    "longitude": "24.00000000",
    "emoji": "🇧🇼",
    "emojiU": "U+1F1E7 U+1F1FC"
  },
  {
    "id": 30,
    "currency": "NOK",
    "name": "Bouvet Island",
    "latitude": "-54.43333333",
    "longitude": "3.40000000",
    "emoji": "🇧🇻",
    "emojiU": "U+1F1E7 U+1F1FB"
  },
  {
    "id": 31,
    "currency": "BRL",
    "name": "Brazil",
    "latitude": "-10.00000000",
    "longitude": "-55.00000000",
    "emoji": "🇧🇷",
    "emojiU": "U+1F1E7 U+1F1F7"
  },
  {
    "id": 32,
    "currency": "USD",
    "name": "British Indian Ocean Territory",
    "latitude": "-6.00000000",
    "longitude": "71.50000000",
    "emoji": "🇮🇴",
    "emojiU": "U+1F1EE U+1F1F4"
  },
  {
    "id": 33,
    "currency": "BND",
    "name": "Brunei",
    "latitude": "4.50000000",
    "longitude": "114.66666666",
    "emoji": "🇧🇳",
    "emojiU": "U+1F1E7 U+1F1F3"
  },
  {
    "id": 34,
    "currency": "BGN",
    "name": "Bulgaria",
    "latitude": "43.00000000",
    "longitude": "25.00000000",
    "emoji": "🇧🇬",
    "emojiU": "U+1F1E7 U+1F1EC"
  },
  {
    "id": 35,
    "currency": "XOF",
    "name": "Burkina Faso",
    "latitude": "13.00000000",
    "longitude": "-2.00000000",
    "emoji": "🇧🇫",
    "emojiU": "U+1F1E7 U+1F1EB"
  },
  {
    "id": 36,
    "currency": "BIF",
    "name": "Burundi",
    "latitude": "-3.50000000",
    "longitude": "30.00000000",
    "emoji": "🇧🇮",
    "emojiU": "U+1F1E7 U+1F1EE"
  },
  {
    "id": 37,
    "currency": "KHR",
    "name": "Cambodia",
    "latitude": "13.00000000",
    "longitude": "105.00000000",
    "emoji": "🇰🇭",
    "emojiU": "U+1F1F0 U+1F1ED"
  },
  {
    "id": 38,
    "currency": "XAF",
    "name": "Cameroon",
    "latitude": "6.00000000",
    "longitude": "12.00000000",
    "emoji": "🇨🇲",
    "emojiU": "U+1F1E8 U+1F1F2"
  },
  {
    "id": 39,
    "currency": "CAD",
    "name": "Canada",
    "latitude": "60.00000000",
    "longitude": "-95.00000000",
    "emoji": "🇨🇦",
    "emojiU": "U+1F1E8 U+1F1E6"
  },
  {
    "id": 40,
    "currency": "CVE",
    "name": "Cape Verde",
    "latitude": "16.00000000",
    "longitude": "-24.00000000",
    "emoji": "🇨🇻",
    "emojiU": "U+1F1E8 U+1F1FB"
  },
  {
    "id": 41,
    "currency": "KYD",
    "name": "Cayman Islands",
    "latitude": "19.50000000",
    "longitude": "-80.50000000",
    "emoji": "🇰🇾",
    "emojiU": "U+1F1F0 U+1F1FE"
  },
  {
    "id": 42,
    "currency": "XAF",
    "name": "Central African Republic",
    "latitude": "7.00000000",
    "longitude": "21.00000000",
    "emoji": "🇨🇫",
    "emojiU": "U+1F1E8 U+1F1EB"
  },
  {
    "id": 43,
    "currency": "XAF",
    "name": "Chad",
    "latitude": "15.00000000",
    "longitude": "19.00000000",
    "emoji": "🇹🇩",
    "emojiU": "U+1F1F9 U+1F1E9"
  },
  {
    "id": 44,
    "currency": "CLP",
    "name": "Chile",
    "latitude": "-30.00000000",
    "longitude": "-71.00000000",
    "emoji": "🇨🇱",
    "emojiU": "U+1F1E8 U+1F1F1"
  },
  {
    "id": 45,
    "currency": "CNY",
    "name": "China",
    "latitude": "35.00000000",
    "longitude": "105.00000000",
    "emoji": "🇨🇳",
    "emojiU": "U+1F1E8 U+1F1F3"
  },
  {
    "id": 46,
    "currency": "AUD",
    "name": "Christmas Island",
    "latitude": "-10.50000000",
    "longitude": "105.66666666",
    "emoji": "🇨🇽",
    "emojiU": "U+1F1E8 U+1F1FD"
  },
  {
    "id": 47,
    "currency": "AUD",
    "name": "Cocos (Keeling) Islands",
    "latitude": "-12.50000000",
    "longitude": "96.83333333",
    "emoji": "🇨🇨",
    "emojiU": "U+1F1E8 U+1F1E8"
  },
  {
    "id": 48,
    "currency": "COP",
    "name": "Colombia",
    "latitude": "4.00000000",
    "longitude": "-72.00000000",
    "emoji": "🇨🇴",
    "emojiU": "U+1F1E8 U+1F1F4"
  },
  {
    "id": 49,
    "currency": "KMF",
    "name": "Comoros",
    "latitude": "-12.16666666",
    "longitude": "44.25000000",
    "emoji": "🇰🇲",
    "emojiU": "U+1F1F0 U+1F1F2"
  },
  {
    "id": 50,
    "currency": "XAF",
    "name": "Congo",
    "latitude": "-1.00000000",
    "longitude": "15.00000000",
    "emoji": "🇨🇬",
    "emojiU": "U+1F1E8 U+1F1EC"
  },
  {
    "id": 51,
    "currency": "CDF",
    "name": "Democratic Republic of the Congo",
    "latitude": "0.00000000",
    "longitude": "25.00000000",
    "emoji": "🇨🇩",
    "emojiU": "U+1F1E8 U+1F1E9"
  },
  {
    "id": 52,
    "currency": "NZD",
    "name": "Cook Islands",
    "latitude": "-21.23333333",
    "longitude": "-159.76666666",
    "emoji": "🇨🇰",
    "emojiU": "U+1F1E8 U+1F1F0"
  },
  {
    "id": 53,
    "currency": "CRC",
    "name": "Costa Rica",
    "latitude": "10.00000000",
    "longitude": "-84.00000000",
    "emoji": "🇨🇷",
    "emojiU": "U+1F1E8 U+1F1F7"
  },
  {
    "id": 54,
    "currency": "XOF",
    "name": "Cote D'Ivoire (Ivory Coast)",
    "latitude": "8.00000000",
    "longitude": "-5.00000000",
    "emoji": "🇨🇮",
    "emojiU": "U+1F1E8 U+1F1EE"
  },
  {
    "id": 55,
    "currency": "HRK",
    "name": "Croatia",
    "latitude": "45.16666666",
    "longitude": "15.50000000",
    "emoji": "🇭🇷",
    "emojiU": "U+1F1ED U+1F1F7"
  },
  {
    "id": 56,
    "currency": "CUP",
    "name": "Cuba",
    "latitude": "21.50000000",
    "longitude": "-80.00000000",
    "emoji": "🇨🇺",
    "emojiU": "U+1F1E8 U+1F1FA"
  },
  {
    "id": 57,
    "currency": "EUR",
    "name": "Cyprus",
    "latitude": "35.00000000",
    "longitude": "33.00000000",
    "emoji": "🇨🇾",
    "emojiU": "U+1F1E8 U+1F1FE"
  },
  {
    "id": 58,
    "currency": "CZK",
    "name": "Czech Republic",
    "latitude": "49.75000000",
    "longitude": "15.50000000",
    "emoji": "🇨🇿",
    "emojiU": "U+1F1E8 U+1F1FF"
  },
  {
    "id": 59,
    "currency": "DKK",
    "name": "Denmark",
    "latitude": "56.00000000",
    "longitude": "10.00000000",
    "emoji": "🇩🇰",
    "emojiU": "U+1F1E9 U+1F1F0"
  },
  {
    "id": 60,
    "currency": "DJF",
    "name": "Djibouti",
    "latitude": "11.50000000",
    "longitude": "43.00000000",
    "emoji": "🇩🇯",
    "emojiU": "U+1F1E9 U+1F1EF"
  },
  {
    "id": 61,
    "currency": "XCD",
    "name": "Dominica",
    "latitude": "15.41666666",
    "longitude": "-61.33333333",
    "emoji": "🇩🇲",
    "emojiU": "U+1F1E9 U+1F1F2"
  },
  {
    "id": 62,
    "currency": "DOP",
    "name": "Dominican Republic",
    "latitude": "19.00000000",
    "longitude": "-70.66666666",
    "emoji": "🇩🇴",
    "emojiU": "U+1F1E9 U+1F1F4"
  },
  {
    "id": 63,
    "currency": "USD",
    "name": "East Timor",
    "latitude": "-8.83333333",
    "longitude": "125.91666666",
    "emoji": "🇹🇱",
    "emojiU": "U+1F1F9 U+1F1F1"
  },
  {
    "id": 64,
    "currency": "USD",
    "name": "Ecuador",
    "latitude": "-2.00000000",
    "longitude": "-77.50000000",
    "emoji": "🇪🇨",
    "emojiU": "U+1F1EA U+1F1E8"
  },
  {
    "id": 65,
    "currency": "EGP",
    "name": "Egypt",
    "latitude": "27.00000000",
    "longitude": "30.00000000",
    "emoji": "🇪🇬",
    "emojiU": "U+1F1EA U+1F1EC"
  },
  {
    "id": 66,
    "currency": "USD",
    "name": "El Salvador",
    "latitude": "13.83333333",
    "longitude": "-88.91666666",
    "emoji": "🇸🇻",
    "emojiU": "U+1F1F8 U+1F1FB"
  },
  {
    "id": 67,
    "currency": "XAF",
    "name": "Equatorial Guinea",
    "latitude": "2.00000000",
    "longitude": "10.00000000",
    "emoji": "🇬🇶",
    "emojiU": "U+1F1EC U+1F1F6"
  },
  {
    "id": 68,
    "currency": "ERN",
    "name": "Eritrea",
    "latitude": "15.00000000",
    "longitude": "39.00000000",
    "emoji": "🇪🇷",
    "emojiU": "U+1F1EA U+1F1F7"
  },
  {
    "id": 69,
    "currency": "EUR",
    "name": "Estonia",
    "latitude": "59.00000000",
    "longitude": "26.00000000",
    "emoji": "🇪🇪",
    "emojiU": "U+1F1EA U+1F1EA"
  },
  {
    "id": 70,
    "currency": "ETB",
    "name": "Ethiopia",
    "latitude": "8.00000000",
    "longitude": "38.00000000",
    "emoji": "🇪🇹",
    "emojiU": "U+1F1EA U+1F1F9"
  },
  {
    "id": 71,
    "currency": "FKP",
    "name": "Falkland Islands",
    "latitude": "-51.75000000",
    "longitude": "-59.00000000",
    "emoji": "🇫🇰",
    "emojiU": "U+1F1EB U+1F1F0"
  },
  {
    "id": 72,
    "currency": "DKK",
    "name": "Faroe Islands",
    "latitude": "62.00000000",
    "longitude": "-7.00000000",
    "emoji": "🇫🇴",
    "emojiU": "U+1F1EB U+1F1F4"
  },
  {
    "id": 73,
    "currency": "FJD",
    "name": "Fiji Islands",
    "latitude": "-18.00000000",
    "longitude": "175.00000000",
    "emoji": "🇫🇯",
    "emojiU": "U+1F1EB U+1F1EF"
  },
  {
    "id": 74,
    "currency": "EUR",
    "name": "Finland",
    "latitude": "64.00000000",
    "longitude": "26.00000000",
    "emoji": "🇫🇮",
    "emojiU": "U+1F1EB U+1F1EE"
  },
  {
    "id": 75,
    "currency": "EUR",
    "name": "France",
    "latitude": "46.00000000",
    "longitude": "2.00000000",
    "emoji": "🇫🇷",
    "emojiU": "U+1F1EB U+1F1F7"
  },
  {
    "id": 76,
    "currency": "EUR",
    "name": "French Guiana",
    "latitude": "4.00000000",
    "longitude": "-53.00000000",
    "emoji": "🇬🇫",
    "emojiU": "U+1F1EC U+1F1EB"
  },
  {
    "id": 77,
    "currency": "XPF",
    "name": "French Polynesia",
    "latitude": "-15.00000000",
    "longitude": "-140.00000000",
    "emoji": "🇵🇫",
    "emojiU": "U+1F1F5 U+1F1EB"
  },
  {
    "id": 78,
    "currency": "EUR",
    "name": "French Southern Territories",
    "latitude": "-49.25000000",
    "longitude": "69.16700000",
    "emoji": "🇹🇫",
    "emojiU": "U+1F1F9 U+1F1EB"
  },
  {
    "id": 79,
    "currency": "XAF",
    "name": "Gabon",
    "latitude": "-1.00000000",
    "longitude": "11.75000000",
    "emoji": "🇬🇦",
    "emojiU": "U+1F1EC U+1F1E6"
  },
  {
    "id": 80,
    "currency": "GMD",
    "name": "Gambia The",
    "latitude": "13.46666666",
    "longitude": "-16.56666666",
    "emoji": "🇬🇲",
    "emojiU": "U+1F1EC U+1F1F2"
  },
  {
    "id": 81,
    "currency": "GEL",
    "name": "Georgia",
    "latitude": "42.00000000",
    "longitude": "43.50000000",
    "emoji": "🇬🇪",
    "emojiU": "U+1F1EC U+1F1EA"
  },
  {
    "id": 82,
    "currency": "EUR",
    "name": "Germany",
    "latitude": "51.00000000",
    "longitude": "9.00000000",
    "emoji": "🇩🇪",
    "emojiU": "U+1F1E9 U+1F1EA"
  },
  {
    "id": 83,
    "currency": "GHS",
    "name": "Ghana",
    "latitude": "8.00000000",
    "longitude": "-2.00000000",
    "emoji": "🇬🇭",
    "emojiU": "U+1F1EC U+1F1ED"
  },
  {
    "id": 84,
    "currency": "GIP",
    "name": "Gibraltar",
    "latitude": "36.13333333",
    "longitude": "-5.35000000",
    "emoji": "🇬🇮",
    "emojiU": "U+1F1EC U+1F1EE"
  },
  {
    "id": 85,
    "currency": "EUR",
    "name": "Greece",
    "latitude": "39.00000000",
    "longitude": "22.00000000",
    "emoji": "🇬🇷",
    "emojiU": "U+1F1EC U+1F1F7"
  },
  {
    "id": 86,
    "currency": "DKK",
    "name": "Greenland",
    "latitude": "72.00000000",
    "longitude": "-40.00000000",
    "emoji": "🇬🇱",
    "emojiU": "U+1F1EC U+1F1F1"
  },
  {
    "id": 87,
    "currency": "XCD",
    "name": "Grenada",
    "latitude": "12.11666666",
    "longitude": "-61.66666666",
    "emoji": "🇬🇩",
    "emojiU": "U+1F1EC U+1F1E9"
  },
  {
    "id": 88,
    "currency": "EUR",
    "name": "Guadeloupe",
    "latitude": "16.25000000",
    "longitude": "-61.58333300",
    "emoji": "🇬🇵",
    "emojiU": "U+1F1EC U+1F1F5"
  },
  {
    "id": 89,
    "currency": "USD",
    "name": "Guam",
    "latitude": "13.46666666",
    "longitude": "144.78333333",
    "emoji": "🇬🇺",
    "emojiU": "U+1F1EC U+1F1FA"
  },
  {
    "id": 90,
    "currency": "GTQ",
    "name": "Guatemala",
    "latitude": "15.50000000",
    "longitude": "-90.25000000",
    "emoji": "🇬🇹",
    "emojiU": "U+1F1EC U+1F1F9"
  },
  {
    "id": 91,
    "currency": "GBP",
    "name": "Guernsey and Alderney",
    "latitude": "49.46666666",
    "longitude": "-2.58333333",
    "emoji": "🇬🇬",
    "emojiU": "U+1F1EC U+1F1EC"
  },
  {
    "id": 92,
    "currency": "GNF",
    "name": "Guinea",
    "latitude": "11.00000000",
    "longitude": "-10.00000000",
    "emoji": "🇬🇳",
    "emojiU": "U+1F1EC U+1F1F3"
  },
  {
    "id": 93,
    "currency": "XOF",
    "name": "Guinea-Bissau",
    "latitude": "12.00000000",
    "longitude": "-15.00000000",
    "emoji": "🇬🇼",
    "emojiU": "U+1F1EC U+1F1FC"
  },
  {
    "id": 94,
    "currency": "GYD",
    "name": "Guyana",
    "latitude": "5.00000000",
    "longitude": "-59.00000000",
    "emoji": "🇬🇾",
    "emojiU": "U+1F1EC U+1F1FE"
  },
  {
    "id": 95,
    "currency": "HTG",
    "name": "Haiti",
    "latitude": "19.00000000",
    "longitude": "-72.41666666",
    "emoji": "🇭🇹",
    "emojiU": "U+1F1ED U+1F1F9"
  },
  {
    "id": 96,
    "currency": "AUD",
    "name": "Heard Island and McDonald Islands",
    "latitude": "-53.10000000",
    "longitude": "72.51666666",
    "emoji": "🇭🇲",
    "emojiU": "U+1F1ED U+1F1F2"
  },
  {
    "id": 97,
    "currency": "HNL",
    "name": "Honduras",
    "latitude": "15.00000000",
    "longitude": "-86.50000000",
    "emoji": "🇭🇳",
    "emojiU": "U+1F1ED U+1F1F3"
  },
  {
    "id": 98,
    "currency": "HKD",
    "name": "Hong Kong S.A.R.",
    "latitude": "22.25000000",
    "longitude": "114.16666666",
    "emoji": "🇭🇰",
    "emojiU": "U+1F1ED U+1F1F0"
  },
  {
    "id": 99,
    "currency": "HUF",
    "name": "Hungary",
    "latitude": "47.00000000",
    "longitude": "20.00000000",
    "emoji": "🇭🇺",
    "emojiU": "U+1F1ED U+1F1FA"
  },
  {
    "id": 100,
    "currency": "ISK",
    "name": "Iceland",
    "latitude": "65.00000000",
    "longitude": "-18.00000000",
    "emoji": "🇮🇸",
    "emojiU": "U+1F1EE U+1F1F8"
  },
  {
    "id": 101,
    "currency": "INR",
    "name": "India",
    "latitude": "20.00000000",
    "longitude": "77.00000000",
    "emoji": "🇮🇳",
    "emojiU": "U+1F1EE U+1F1F3"
  },
  {
    "id": 102,
    "currency": "IDR",
    "name": "Indonesia",
    "latitude": "-5.00000000",
    "longitude": "120.00000000",
    "emoji": "🇮🇩",
    "emojiU": "U+1F1EE U+1F1E9"
  },
  {
    "id": 103,
    "currency": "IRR",
    "name": "Iran",
    "latitude": "32.00000000",
    "longitude": "53.00000000",
    "emoji": "🇮🇷",
    "emojiU": "U+1F1EE U+1F1F7"
  },
  {
    "id": 104,
    "currency": "IQD",
    "name": "Iraq",
    "latitude": "33.00000000",
    "longitude": "44.00000000",
    "emoji": "🇮🇶",
    "emojiU": "U+1F1EE U+1F1F6"
  },
  {
    "id": 105,
    "currency": "EUR",
    "name": "Ireland",
    "latitude": "53.00000000",
    "longitude": "-8.00000000",
    "emoji": "🇮🇪",
    "emojiU": "U+1F1EE U+1F1EA"
  },
  {
    "id": 106,
    "currency": "ILS",
    "name": "Israel",
    "latitude": "31.50000000",
    "longitude": "34.75000000",
    "emoji": "🇮🇱",
    "emojiU": "U+1F1EE U+1F1F1"
  },
  {
    "id": 107,
    "currency": "EUR",
    "name": "Italy",
    "latitude": "42.83333333",
    "longitude": "12.83333333",
    "emoji": "🇮🇹",
    "emojiU": "U+1F1EE U+1F1F9"
  },
  {
    "id": 108,
    "currency": "JMD",
    "name": "Jamaica",
    "latitude": "18.25000000",
    "longitude": "-77.50000000",
    "emoji": "🇯🇲",
    "emojiU": "U+1F1EF U+1F1F2"
  },
  {
    "id": 109,
    "currency": "JPY",
    "name": "Japan",
    "latitude": "36.00000000",
    "longitude": "138.00000000",
    "emoji": "🇯🇵",
    "emojiU": "U+1F1EF U+1F1F5"
  },
  {
    "id": 110,
    "currency": "GBP",
    "name": "Jersey",
    "latitude": "49.25000000",
    "longitude": "-2.16666666",
    "emoji": "🇯🇪",
    "emojiU": "U+1F1EF U+1F1EA"
  },
  {
    "id": 111,
    "currency": "JOD",
    "name": "Jordan",
    "latitude": "31.00000000",
    "longitude": "36.00000000",
    "emoji": "🇯🇴",
    "emojiU": "U+1F1EF U+1F1F4"
  },
  {
    "id": 112,
    "currency": "KZT",
    "name": "Kazakhstan",
    "latitude": "48.00000000",
    "longitude": "68.00000000",
    "emoji": "🇰🇿",
    "emojiU": "U+1F1F0 U+1F1FF"
  },
  {
    "id": 113,
    "currency": "KES",
    "name": "Kenya",
    "latitude": "1.00000000",
    "longitude": "38.00000000",
    "emoji": "🇰🇪",
    "emojiU": "U+1F1F0 U+1F1EA"
  },
  {
    "id": 114,
    "currency": "AUD",
    "name": "Kiribati",
    "latitude": "1.41666666",
    "longitude": "173.00000000",
    "emoji": "🇰🇮",
    "emojiU": "U+1F1F0 U+1F1EE"
  },
  {
    "id": 115,
    "currency": "KPW",
    "name": "North Korea",
    "latitude": "40.00000000",
    "longitude": "127.00000000",
    "emoji": "🇰🇵",
    "emojiU": "U+1F1F0 U+1F1F5"
  },
  {
    "id": 116,
    "currency": "KRW",
    "name": "South Korea",
    "latitude": "37.00000000",
    "longitude": "127.50000000",
    "emoji": "🇰🇷",
    "emojiU": "U+1F1F0 U+1F1F7"
  },
  {
    "id": 117,
    "currency": "KWD",
    "name": "Kuwait",
    "latitude": "29.50000000",
    "longitude": "45.75000000",
    "emoji": "🇰🇼",
    "emojiU": "U+1F1F0 U+1F1FC"
  },
  {
    "id": 118,
    "currency": "KGS",
    "name": "Kyrgyzstan",
    "latitude": "41.00000000",
    "longitude": "75.00000000",
    "emoji": "🇰🇬",
    "emojiU": "U+1F1F0 U+1F1EC"
  },
  {
    "id": 119,
    "currency": "LAK",
    "name": "Laos",
    "latitude": "18.00000000",
    "longitude": "105.00000000",
    "emoji": "🇱🇦",
    "emojiU": "U+1F1F1 U+1F1E6"
  },
  {
    "id": 120,
    "currency": "EUR",
    "name": "Latvia",
    "latitude": "57.00000000",
    "longitude": "25.00000000",
    "emoji": "🇱🇻",
    "emojiU": "U+1F1F1 U+1F1FB"
  },
  {
    "id": 121,
    "currency": "LBP",
    "name": "Lebanon",
    "latitude": "33.83333333",
    "longitude": "35.83333333",
    "emoji": "🇱🇧",
    "emojiU": "U+1F1F1 U+1F1E7"
  },
  {
    "id": 122,
    "currency": "LSL",
    "name": "Lesotho",
    "latitude": "-29.50000000",
    "longitude": "28.50000000",
    "emoji": "🇱🇸",
    "emojiU": "U+1F1F1 U+1F1F8"
  },
  {
    "id": 123,
    "currency": "LRD",
    "name": "Liberia",
    "latitude": "6.50000000",
    "longitude": "-9.50000000",
    "emoji": "🇱🇷",
    "emojiU": "U+1F1F1 U+1F1F7"
  },
  {
    "id": 124,
    "currency": "LYD",
    "name": "Libya",
    "latitude": "25.00000000",
    "longitude": "17.00000000",
    "emoji": "🇱🇾",
    "emojiU": "U+1F1F1 U+1F1FE"
  },
  {
    "id": 125,
    "currency": "CHF",
    "name": "Liechtenstein",
    "latitude": "47.26666666",
    "longitude": "9.53333333",
    "emoji": "🇱🇮",
    "emojiU": "U+1F1F1 U+1F1EE"
  },
  {
    "id": 126,
    "currency": "EUR",
    "name": "Lithuania",
    "latitude": "56.00000000",
    "longitude": "24.00000000",
    "emoji": "🇱🇹",
    "emojiU": "U+1F1F1 U+1F1F9"
  },
  {
    "id": 127,
    "currency": "EUR",
    "name": "Luxembourg",
    "latitude": "49.75000000",
    "longitude": "6.16666666",
    "emoji": "🇱🇺",
    "emojiU": "U+1F1F1 U+1F1FA"
  },
  {
    "id": 128,
    "currency": "MOP",
    "name": "Macau S.A.R.",
    "latitude": "22.16666666",
    "longitude": "113.55000000",
    "emoji": "🇲🇴",
    "emojiU": "U+1F1F2 U+1F1F4"
  },
  {
    "id": 129,
    "currency": "MKD",
    "name": "North Macedonia",
    "latitude": "41.83333333",
    "longitude": "22.00000000",
    "emoji": "🇲🇰",
    "emojiU": "U+1F1F2 U+1F1F0"
  },
  {
    "id": 130,
    "currency": "MGA",
    "name": "Madagascar",
    "latitude": "-20.00000000",
    "longitude": "47.00000000",
    "emoji": "🇲🇬",
    "emojiU": "U+1F1F2 U+1F1EC"
  },
  {
    "id": 131,
    "currency": "MWK",
    "name": "Malawi",
    "latitude": "-13.50000000",
    "longitude": "34.00000000",
    "emoji": "🇲🇼",
    "emojiU": "U+1F1F2 U+1F1FC"
  },
  {
    "id": 132,
    "currency": "MYR",
    "name": "Malaysia",
    "latitude": "2.50000000",
    "longitude": "112.50000000",
    "emoji": "🇲🇾",
    "emojiU": "U+1F1F2 U+1F1FE"
  },
  {
    "id": 133,
    "currency": "MVR",
    "name": "Maldives",
    "latitude": "3.25000000",
    "longitude": "73.00000000",
    "emoji": "🇲🇻",
    "emojiU": "U+1F1F2 U+1F1FB"
  },
  {
    "id": 134,
    "currency": "XOF",
    "name": "Mali",
    "latitude": "17.00000000",
    "longitude": "-4.00000000",
    "emoji": "🇲🇱",
    "emojiU": "U+1F1F2 U+1F1F1"
  },
  {
    "id": 135,
    "currency": "EUR",
    "name": "Malta",
    "latitude": "35.83333333",
    "longitude": "14.58333333",
    "emoji": "🇲🇹",
    "emojiU": "U+1F1F2 U+1F1F9"
  },
  {
    "id": 136,
    "currency": "GBP",
    "name": "Man (Isle of)",
    "latitude": "54.25000000",
    "longitude": "-4.50000000",
    "emoji": "🇮🇲",
    "emojiU": "U+1F1EE U+1F1F2"
  },
  {
    "id": 137,
    "currency": "USD",
    "name": "Marshall Islands",
    "latitude": "9.00000000",
    "longitude": "168.00000000",
    "emoji": "🇲🇭",
    "emojiU": "U+1F1F2 U+1F1ED"
  },
  {
    "id": 138,
    "currency": "EUR",
    "name": "Martinique",
    "latitude": "14.66666700",
    "longitude": "-61.00000000",
    "emoji": "🇲🇶",
    "emojiU": "U+1F1F2 U+1F1F6"
  },
  {
    "id": 139,
    "currency": "MRO",
    "name": "Mauritania",
    "latitude": "20.00000000",
    "longitude": "-12.00000000",
    "emoji": "🇲🇷",
    "emojiU": "U+1F1F2 U+1F1F7"
  },
  {
    "id": 140,
    "currency": "MUR",
    "name": "Mauritius",
    "latitude": "-20.28333333",
    "longitude": "57.55000000",
    "emoji": "🇲🇺",
    "emojiU": "U+1F1F2 U+1F1FA"
  },
  {
    "id": 141,
    "currency": "EUR",
    "name": "Mayotte",
    "latitude": "-12.83333333",
    "longitude": "45.16666666",
    "emoji": "🇾🇹",
    "emojiU": "U+1F1FE U+1F1F9"
  },
  {
    "id": 142,
    "currency": "MXN",
    "name": "Mexico",
    "latitude": "23.00000000",
    "longitude": "-102.00000000",
    "emoji": "🇲🇽",
    "emojiU": "U+1F1F2 U+1F1FD"
  },
  {
    "id": 143,
    "currency": "USD",
    "name": "Micronesia",
    "latitude": "6.91666666",
    "longitude": "158.25000000",
    "emoji": "🇫🇲",
    "emojiU": "U+1F1EB U+1F1F2"
  },
  {
    "id": 144,
    "currency": "MDL",
    "name": "Moldova",
    "latitude": "47.00000000",
    "longitude": "29.00000000",
    "emoji": "🇲🇩",
    "emojiU": "U+1F1F2 U+1F1E9"
  },
  {
    "id": 145,
    "currency": "EUR",
    "name": "Monaco",
    "latitude": "43.73333333",
    "longitude": "7.40000000",
    "emoji": "🇲🇨",
    "emojiU": "U+1F1F2 U+1F1E8"
  },
  {
    "id": 146,
    "currency": "MNT",
    "name": "Mongolia",
    "latitude": "46.00000000",
    "longitude": "105.00000000",
    "emoji": "🇲🇳",
    "emojiU": "U+1F1F2 U+1F1F3"
  },
  {
    "id": 147,
    "currency": "EUR",
    "name": "Montenegro",
    "latitude": "42.50000000",
    "longitude": "19.30000000",
    "emoji": "🇲🇪",
    "emojiU": "U+1F1F2 U+1F1EA"
  },
  {
    "id": 148,
    "currency": "XCD",
    "name": "Montserrat",
    "latitude": "16.75000000",
    "longitude": "-62.20000000",
    "emoji": "🇲🇸",
    "emojiU": "U+1F1F2 U+1F1F8"
  },
  {
    "id": 149,
    "currency": "MAD",
    "name": "Morocco",
    "latitude": "32.00000000",
    "longitude": "-5.00000000",
    "emoji": "🇲🇦",
    "emojiU": "U+1F1F2 U+1F1E6"
  },
  {
    "id": 150,
    "currency": "MZN",
    "name": "Mozambique",
    "latitude": "-18.25000000",
    "longitude": "35.00000000",
    "emoji": "🇲🇿",
    "emojiU": "U+1F1F2 U+1F1FF"
  },
  {
    "id": 151,
    "currency": "MMK",
    "name": "Myanmar",
    "latitude": "22.00000000",
    "longitude": "98.00000000",
    "emoji": "🇲🇲",
    "emojiU": "U+1F1F2 U+1F1F2"
  },
  {
    "id": 152,
    "currency": "NAD",
    "name": "Namibia",
    "latitude": "-22.00000000",
    "longitude": "17.00000000",
    "emoji": "🇳🇦",
    "emojiU": "U+1F1F3 U+1F1E6"
  },
  {
    "id": 153,
    "currency": "AUD",
    "name": "Nauru",
    "latitude": "-0.53333333",
    "longitude": "166.91666666",
    "emoji": "🇳🇷",
    "emojiU": "U+1F1F3 U+1F1F7"
  },
  {
    "id": 154,
    "currency": "NPR",
    "name": "Nepal",
    "latitude": "28.00000000",
    "longitude": "84.00000000",
    "emoji": "🇳🇵",
    "emojiU": "U+1F1F3 U+1F1F5"
  },
  {
    "id": 155,
    "currency": "USD",
    "name": "Bonaire, Sint Eustatius and Saba",
    "latitude": "12.15000000",
    "longitude": "-68.26666700",
    "emoji": "🇧🇶",
    "emojiU": "U+1F1E7 U+1F1F6"
  },
  {
    "id": 156,
    "currency": "EUR",
    "name": "Netherlands",
    "latitude": "52.50000000",
    "longitude": "5.75000000",
    "emoji": "🇳🇱",
    "emojiU": "U+1F1F3 U+1F1F1"
  },
  {
    "id": 157,
    "currency": "XPF",
    "name": "New Caledonia",
    "latitude": "-21.50000000",
    "longitude": "165.50000000",
    "emoji": "🇳🇨",
    "emojiU": "U+1F1F3 U+1F1E8"
  },
  {
    "id": 158,
    "currency": "NZD",
    "name": "New Zealand",
    "latitude": "-41.00000000",
    "longitude": "174.00000000",
    "emoji": "🇳🇿",
    "emojiU": "U+1F1F3 U+1F1FF"
  },
  {
    "id": 159,
    "currency": "NIO",
    "name": "Nicaragua",
    "latitude": "13.00000000",
    "longitude": "-85.00000000",
    "emoji": "🇳🇮",
    "emojiU": "U+1F1F3 U+1F1EE"
  },
  {
    "id": 160,
    "currency": "XOF",
    "name": "Niger",
    "latitude": "16.00000000",
    "longitude": "8.00000000",
    "emoji": "🇳🇪",
    "emojiU": "U+1F1F3 U+1F1EA"
  },
  {
    "id": 161,
    "currency": "NGN",
    "name": "Nigeria",
    "latitude": "10.00000000",
    "longitude": "8.00000000",
    "emoji": "🇳🇬",
    "emojiU": "U+1F1F3 U+1F1EC"
  },
  {
    "id": 162,
    "currency": "NZD",
    "name": "Niue",
    "latitude": "-19.03333333",
    "longitude": "-169.86666666",
    "emoji": "🇳🇺",
    "emojiU": "U+1F1F3 U+1F1FA"
  },
  {
    "id": 163,
    "currency": "AUD",
    "name": "Norfolk Island",
    "latitude": "-29.03333333",
    "longitude": "167.95000000",
    "emoji": "🇳🇫",
    "emojiU": "U+1F1F3 U+1F1EB"
  },
  {
    "id": 164,
    "currency": "USD",
    "name": "Northern Mariana Islands",
    "latitude": "15.20000000",
    "longitude": "145.75000000",
    "emoji": "🇲🇵",
    "emojiU": "U+1F1F2 U+1F1F5"
  },
  {
    "id": 165,
    "currency": "NOK",
    "name": "Norway",
    "latitude": "62.00000000",
    "longitude": "10.00000000",
    "emoji": "🇳🇴",
    "emojiU": "U+1F1F3 U+1F1F4"
  },
  {
    "id": 166,
    "currency": "OMR",
    "name": "Oman",
    "latitude": "21.00000000",
    "longitude": "57.00000000",
    "emoji": "🇴🇲",
    "emojiU": "U+1F1F4 U+1F1F2"
  },
  {
    "id": 167,
    "currency": "PKR",
    "name": "Pakistan",
    "latitude": "30.00000000",
    "longitude": "70.00000000",
    "emoji": "🇵🇰",
    "emojiU": "U+1F1F5 U+1F1F0"
  },
  {
    "id": 168,
    "currency": "USD",
    "name": "Palau",
    "latitude": "7.50000000",
    "longitude": "134.50000000",
    "emoji": "🇵🇼",
    "emojiU": "U+1F1F5 U+1F1FC"
  },
  {
    "id": 169,
    "currency": "ILS",
    "name": "Palestinian Territory Occupied",
    "latitude": "31.90000000",
    "longitude": "35.20000000",
    "emoji": "🇵🇸",
    "emojiU": "U+1F1F5 U+1F1F8"
  },
  {
    "id": 170,
    "currency": "PAB",
    "name": "Panama",
    "latitude": "9.00000000",
    "longitude": "-80.00000000",
    "emoji": "🇵🇦",
    "emojiU": "U+1F1F5 U+1F1E6"
  },
  {
    "id": 171,
    "currency": "PGK",
    "name": "Papua new Guinea",
    "latitude": "-6.00000000",
    "longitude": "147.00000000",
    "emoji": "🇵🇬",
    "emojiU": "U+1F1F5 U+1F1EC"
  },
  {
    "id": 172,
    "currency": "PYG",
    "name": "Paraguay",
    "latitude": "-23.00000000",
    "longitude": "-58.00000000",
    "emoji": "🇵🇾",
    "emojiU": "U+1F1F5 U+1F1FE"
  },
  {
    "id": 173,
    "currency": "PEN",
    "name": "Peru",
    "latitude": "-10.00000000",
    "longitude": "-76.00000000",
    "emoji": "🇵🇪",
    "emojiU": "U+1F1F5 U+1F1EA"
  },
  {
    "id": 174,
    "currency": "PHP",
    "name": "Philippines",
    "latitude": "13.00000000",
    "longitude": "122.00000000",
    "emoji": "🇵🇭",
    "emojiU": "U+1F1F5 U+1F1ED"
  },
  {
    "id": 175,
    "currency": "NZD",
    "name": "Pitcairn Island",
    "latitude": "-25.06666666",
    "longitude": "-130.10000000",
    "emoji": "🇵🇳",
    "emojiU": "U+1F1F5 U+1F1F3"
  },
  {
    "id": 176,
    "currency": "PLN",
    "name": "Poland",
    "latitude": "52.00000000",
    "longitude": "20.00000000",
    "emoji": "🇵🇱",
    "emojiU": "U+1F1F5 U+1F1F1"
  },
  {
    "id": 177,
    "currency": "EUR",
    "name": "Portugal",
    "latitude": "39.50000000",
    "longitude": "-8.00000000",
    "emoji": "🇵🇹",
    "emojiU": "U+1F1F5 U+1F1F9"
  },
  {
    "id": 178,
    "currency": "USD",
    "name": "Puerto Rico",
    "latitude": "18.25000000",
    "longitude": "-66.50000000",
    "emoji": "🇵🇷",
    "emojiU": "U+1F1F5 U+1F1F7"
  },
  {
    "id": 179,
    "currency": "QAR",
    "name": "Qatar",
    "latitude": "25.50000000",
    "longitude": "51.25000000",
    "emoji": "🇶🇦",
    "emojiU": "U+1F1F6 U+1F1E6"
  },
  {
    "id": 180,
    "currency": "EUR",
    "name": "Reunion",
    "latitude": "-21.15000000",
    "longitude": "55.50000000",
    "emoji": "🇷🇪",
    "emojiU": "U+1F1F7 U+1F1EA"
  },
  {
    "id": 181,
    "currency": "RON",
    "name": "Romania",
    "latitude": "46.00000000",
    "longitude": "25.00000000",
    "emoji": "🇷🇴",
    "emojiU": "U+1F1F7 U+1F1F4"
  },
  {
    "id": 182,
    "currency": "RUB",
    "name": "Russia",
    "latitude": "60.00000000",
    "longitude": "100.00000000",
    "emoji": "🇷🇺",
    "emojiU": "U+1F1F7 U+1F1FA"
  },
  {
    "id": 183,
    "currency": "RWF",
    "name": "Rwanda",
    "latitude": "-2.00000000",
    "longitude": "30.00000000",
    "emoji": "🇷🇼",
    "emojiU": "U+1F1F7 U+1F1FC"
  },
  {
    "id": 184,
    "currency": "SHP",
    "name": "Saint Helena",
    "latitude": "-15.95000000",
    "longitude": "-5.70000000",
    "emoji": "🇸🇭",
    "emojiU": "U+1F1F8 U+1F1ED"
  },
  {
    "id": 185,
    "currency": "XCD",
    "name": "Saint Kitts And Nevis",
    "latitude": "17.33333333",
    "longitude": "-62.75000000",
    "emoji": "🇰🇳",
    "emojiU": "U+1F1F0 U+1F1F3"
  },
  {
    "id": 186,
    "currency": "XCD",
    "name": "Saint Lucia",
    "latitude": "13.88333333",
    "longitude": "-60.96666666",
    "emoji": "🇱🇨",
    "emojiU": "U+1F1F1 U+1F1E8"
  },
  {
    "id": 187,
    "currency": "EUR",
    "name": "Saint Pierre and Miquelon",
    "latitude": "46.83333333",
    "longitude": "-56.33333333",
    "emoji": "🇵🇲",
    "emojiU": "U+1F1F5 U+1F1F2"
  },
  {
    "id": 188,
    "currency": "XCD",
    "name": "Saint Vincent And The Grenadines",
    "latitude": "13.25000000",
    "longitude": "-61.20000000",
    "emoji": "🇻🇨",
    "emojiU": "U+1F1FB U+1F1E8"
  },
  {
    "id": 189,
    "currency": "EUR",
    "name": "Saint-Barthelemy",
    "latitude": "18.50000000",
    "longitude": "-63.41666666",
    "emoji": "🇧🇱",
    "emojiU": "U+1F1E7 U+1F1F1"
  },
  {
    "id": 190,
    "currency": "EUR",
    "name": "Saint-Martin (French part)",
    "latitude": "18.08333333",
    "longitude": "-63.95000000",
    "emoji": "🇲🇫",
    "emojiU": "U+1F1F2 U+1F1EB"
  },
  {
    "id": 191,
    "currency": "WST",
    "name": "Samoa",
    "latitude": "-13.58333333",
    "longitude": "-172.33333333",
    "emoji": "🇼🇸",
    "emojiU": "U+1F1FC U+1F1F8"
  },
  {
    "id": 192,
    "currency": "EUR",
    "name": "San Marino",
    "latitude": "43.76666666",
    "longitude": "12.41666666",
    "emoji": "🇸🇲",
    "emojiU": "U+1F1F8 U+1F1F2"
  },
  {
    "id": 193,
    "currency": "STD",
    "name": "Sao Tome and Principe",
    "latitude": "1.00000000",
    "longitude": "7.00000000",
    "emoji": "🇸🇹",
    "emojiU": "U+1F1F8 U+1F1F9"
  },
  {
    "id": 194,
    "currency": "SAR",
    "name": "Saudi Arabia",
    "latitude": "25.00000000",
    "longitude": "45.00000000",
    "emoji": "🇸🇦",
    "emojiU": "U+1F1F8 U+1F1E6"
  },
  {
    "id": 195,
    "currency": "XOF",
    "name": "Senegal",
    "latitude": "14.00000000",
    "longitude": "-14.00000000",
    "emoji": "🇸🇳",
    "emojiU": "U+1F1F8 U+1F1F3"
  },
  {
    "id": 196,
    "currency": "RSD",
    "name": "Serbia",
    "latitude": "44.00000000",
    "longitude": "21.00000000",
    "emoji": "🇷🇸",
    "emojiU": "U+1F1F7 U+1F1F8"
  },
  {
    "id": 197,
    "currency": "SCR",
    "name": "Seychelles",
    "latitude": "-4.58333333",
    "longitude": "55.66666666",
    "emoji": "🇸🇨",
    "emojiU": "U+1F1F8 U+1F1E8"
  },
  {
    "id": 198,
    "currency": "SLL",
    "name": "Sierra Leone",
    "latitude": "8.50000000",
    "longitude": "-11.50000000",
    "emoji": "🇸🇱",
    "emojiU": "U+1F1F8 U+1F1F1"
  },
  {
    "id": 199,
    "currency": "SGD",
    "name": "Singapore",
    "latitude": "1.36666666",
    "longitude": "103.80000000",
    "emoji": "🇸🇬",
    "emojiU": "U+1F1F8 U+1F1EC"
  },
  {
    "id": 200,
    "currency": "EUR",
    "name": "Slovakia",
    "latitude": "48.66666666",
    "longitude": "19.50000000",
    "emoji": "🇸🇰",
    "emojiU": "U+1F1F8 U+1F1F0"
  },
  {
    "id": 201,
    "currency": "EUR",
    "name": "Slovenia",
    "latitude": "46.11666666",
    "longitude": "14.81666666",
    "emoji": "🇸🇮",
    "emojiU": "U+1F1F8 U+1F1EE"
  },
  {
    "id": 202,
    "currency": "SBD",
    "name": "Solomon Islands",
    "latitude": "-8.00000000",
    "longitude": "159.00000000",
    "emoji": "🇸🇧",
    "emojiU": "U+1F1F8 U+1F1E7"
  },
  {
    "id": 203,
    "currency": "SOS",
    "name": "Somalia",
    "latitude": "10.00000000",
    "longitude": "49.00000000",
    "emoji": "🇸🇴",
    "emojiU": "U+1F1F8 U+1F1F4"
  },
  {
    "id": 204,
    "currency": "ZAR",
    "name": "South Africa",
    "latitude": "-29.00000000",
    "longitude": "24.00000000",
    "emoji": "🇿🇦",
    "emojiU": "U+1F1FF U+1F1E6"
  },
  {
    "id": 205,
    "currency": "GBP",
    "name": "South Georgia",
    "latitude": "-54.50000000",
    "longitude": "-37.00000000",
    "emoji": "🇬🇸",
    "emojiU": "U+1F1EC U+1F1F8"
  },
  {
    "id": 206,
    "currency": "SSP",
    "name": "South Sudan",
    "latitude": "7.00000000",
    "longitude": "30.00000000",
    "emoji": "🇸🇸",
    "emojiU": "U+1F1F8 U+1F1F8"
  },
  {
    "id": 207,
    "currency": "EUR",
    "name": "Spain",
    "latitude": "40.00000000",
    "longitude": "-4.00000000",
    "emoji": "🇪🇸",
    "emojiU": "U+1F1EA U+1F1F8"
  },
  {
    "id": 208,
    "currency": "LKR",
    "name": "Sri Lanka",
    "latitude": "7.00000000",
    "longitude": "81.00000000",
    "emoji": "🇱🇰",
    "emojiU": "U+1F1F1 U+1F1F0"
  },
  {
    "id": 209,
    "currency": "SDG",
    "name": "Sudan",
    "latitude": "15.00000000",
    "longitude": "30.00000000",
    "emoji": "🇸🇩",
    "emojiU": "U+1F1F8 U+1F1E9"
  },
  {
    "id": 210,
    "currency": "SRD",
    "name": "Suriname",
    "latitude": "4.00000000",
    "longitude": "-56.00000000",
    "emoji": "🇸🇷",
    "emojiU": "U+1F1F8 U+1F1F7"
  },
  {
    "id": 211,
    "currency": "NOK",
    "name": "Svalbard And Jan Mayen Islands",
    "latitude": "78.00000000",
    "longitude": "20.00000000",
    "emoji": "🇸🇯",
    "emojiU": "U+1F1F8 U+1F1EF"
  },
  {
    "id": 212,
    "currency": "SZL",
    "name": "Swaziland",
    "latitude": "-26.50000000",
    "longitude": "31.50000000",
    "emoji": "🇸🇿",
    "emojiU": "U+1F1F8 U+1F1FF"
  },
  {
    "id": 213,
    "currency": "SEK",
    "name": "Sweden",
    "latitude": "62.00000000",
    "longitude": "15.00000000",
    "emoji": "🇸🇪",
    "emojiU": "U+1F1F8 U+1F1EA"
  },
  {
    "id": 214,
    "currency": "CHF",
    "name": "Switzerland",
    "latitude": "47.00000000",
    "longitude": "8.00000000",
    "emoji": "🇨🇭",
    "emojiU": "U+1F1E8 U+1F1ED"
  },
  {
    "id": 215,
    "currency": "SYP",
    "name": "Syria",
    "latitude": "35.00000000",
    "longitude": "38.00000000",
    "emoji": "🇸🇾",
    "emojiU": "U+1F1F8 U+1F1FE"
  },
  {
    "id": 216,
    "currency": "TWD",
    "name": "Taiwan",
    "latitude": "23.50000000",
    "longitude": "121.00000000",
    "emoji": "🇹🇼",
    "emojiU": "U+1F1F9 U+1F1FC"
  },
  {
    "id": 217,
    "currency": "TJS",
    "name": "Tajikistan",
    "latitude": "39.00000000",
    "longitude": "71.00000000",
    "emoji": "🇹🇯",
    "emojiU": "U+1F1F9 U+1F1EF"
  },
  {
    "id": 218,
    "currency": "TZS",
    "name": "Tanzania",
    "latitude": "-6.00000000",
    "longitude": "35.00000000",
    "emoji": "🇹🇿",
    "emojiU": "U+1F1F9 U+1F1FF"
  },
  {
    "id": 219,
    "currency": "THB",
    "name": "Thailand",
    "latitude": "15.00000000",
    "longitude": "100.00000000",
    "emoji": "🇹🇭",
    "emojiU": "U+1F1F9 U+1F1ED"
  },
  {
    "id": 220,
    "currency": "XOF",
    "name": "Togo",
    "latitude": "8.00000000",
    "longitude": "1.16666666",
    "emoji": "🇹🇬",
    "emojiU": "U+1F1F9 U+1F1EC"
  },
  {
    "id": 221,
    "currency": "NZD",
    "name": "Tokelau",
    "latitude": "-9.00000000",
    "longitude": "-172.00000000",
    "emoji": "🇹🇰",
    "emojiU": "U+1F1F9 U+1F1F0"
  },
  {
    "id": 222,
    "currency": "TOP",
    "name": "Tonga",
    "latitude": "-20.00000000",
    "longitude": "-175.00000000",
    "emoji": "🇹🇴",
    "emojiU": "U+1F1F9 U+1F1F4"
  },
  {
    "id": 223,
    "currency": "TTD",
    "name": "Trinidad And Tobago",
    "latitude": "11.00000000",
    "longitude": "-61.00000000",
    "emoji": "🇹🇹",
    "emojiU": "U+1F1F9 U+1F1F9"
  },
  {
    "id": 224,
    "currency": "TND",
    "name": "Tunisia",
    "latitude": "34.00000000",
    "longitude": "9.00000000",
    "emoji": "🇹🇳",
    "emojiU": "U+1F1F9 U+1F1F3"
  },
  {
    "id": 225,
    "currency": "TRY",
    "name": "Turkey",
    "latitude": "39.00000000",
    "longitude": "35.00000000",
    "emoji": "🇹🇷",
    "emojiU": "U+1F1F9 U+1F1F7"
  },
  {
    "id": 226,
    "currency": "TMT",
    "name": "Turkmenistan",
    "latitude": "40.00000000",
    "longitude": "60.00000000",
    "emoji": "🇹🇲",
    "emojiU": "U+1F1F9 U+1F1F2"
  },
  {
    "id": 227,
    "currency": "USD",
    "name": "Turks And Caicos Islands",
    "latitude": "21.75000000",
    "longitude": "-71.58333333",
    "emoji": "🇹🇨",
    "emojiU": "U+1F1F9 U+1F1E8"
  },
  {
    "id": 228,
    "currency": "AUD",
    "name": "Tuvalu",
    "latitude": "-8.00000000",
    "longitude": "178.00000000",
    "emoji": "🇹🇻",
    "emojiU": "U+1F1F9 U+1F1FB"
  },
  {
    "id": 229,
    "currency": "UGX",
    "name": "Uganda",
    "latitude": "1.00000000",
    "longitude": "32.00000000",
    "emoji": "🇺🇬",
    "emojiU": "U+1F1FA U+1F1EC"
  },
  {
    "id": 230,
    "currency": "UAH",
    "name": "Ukraine",
    "latitude": "49.00000000",
    "longitude": "32.00000000",
    "emoji": "🇺🇦",
    "emojiU": "U+1F1FA U+1F1E6"
  },
  {
    "id": 231,
    "currency": "AED",
    "name": "United Arab Emirates",
    "latitude": "24.00000000",
    "longitude": "54.00000000",
    "emoji": "🇦🇪",
    "emojiU": "U+1F1E6 U+1F1EA"
  },
  {
    "id": 232,
    "currency": "GBP",
    "name": "United Kingdom",
    "latitude": "54.00000000",
    "longitude": "-2.00000000",
    "emoji": "🇬🇧",
    "emojiU": "U+1F1EC U+1F1E7"
  },
  {
    "id": 233,
    "currency": "USD",
    "name": "United States",
    "latitude": "38.00000000",
    "longitude": "-97.00000000",
    "emoji": "🇺🇸",
    "emojiU": "U+1F1FA U+1F1F8"
  },
  {
    "id": 234,
    "currency": "USD",
    "name": "United States Minor Outlying Islands",
    "latitude": "0.00000000",
    "longitude": "0.00000000",
    "emoji": "🇺🇲",
    "emojiU": "U+1F1FA U+1F1F2"
  },
  {
    "id": 235,
    "currency": "UYU",
    "name": "Uruguay",
    "latitude": "-33.00000000",
    "longitude": "-56.00000000",
    "emoji": "🇺🇾",
    "emojiU": "U+1F1FA U+1F1FE"
  },
  {
    "id": 236,
    "currency": "UZS",
    "name": "Uzbekistan",
    "latitude": "41.00000000",
    "longitude": "64.00000000",
    "emoji": "🇺🇿",
    "emojiU": "U+1F1FA U+1F1FF"
  },
  {
    "id": 237,
    "currency": "VUV",
    "name": "Vanuatu",
    "latitude": "-16.00000000",
    "longitude": "167.00000000",
    "emoji": "🇻🇺",
    "emojiU": "U+1F1FB U+1F1FA"
  },
  {
    "id": 238,
    "currency": "EUR",
    "name": "Vatican City State (Holy See)",
    "latitude": "41.90000000",
    "longitude": "12.45000000",
    "emoji": "🇻🇦",
    "emojiU": "U+1F1FB U+1F1E6"
  },
  {
    "id": 239,
    "currency": "VEF",
    "name": "Venezuela",
    "latitude": "8.00000000",
    "longitude": "-66.00000000",
    "emoji": "🇻🇪",
    "emojiU": "U+1F1FB U+1F1EA"
  },
  {
    "id": 240,
    "currency": "VND",
    "name": "Vietnam",
    "latitude": "16.16666666",
    "longitude": "107.83333333",
    "emoji": "🇻🇳",
    "emojiU": "U+1F1FB U+1F1F3"
  },
  {
    "id": 241,
    "currency": "USD",
    "name": "Virgin Islands (British)",
    "latitude": "18.43138300",
    "longitude": "-64.62305000",
    "emoji": "🇻🇬",
    "emojiU": "U+1F1FB U+1F1EC"
  },
  {
    "id": 242,
    "currency": "USD",
    "name": "Virgin Islands (US)",
    "latitude": "18.34000000",
    "longitude": "-64.93000000",
    "emoji": "🇻🇮",
    "emojiU": "U+1F1FB U+1F1EE"
  },
  {
    "id": 243,
    "currency": "XPF",
    "name": "Wallis And Futuna Islands",
    "latitude": "-13.30000000",
    "longitude": "-176.20000000",
    "emoji": "🇼🇫",
    "emojiU": "U+1F1FC U+1F1EB"
  },
  {
    "id": 244,
    "currency": "MAD",
    "name": "Western Sahara",
    "latitude": "24.50000000",
    "longitude": "-13.00000000",
    "emoji": "🇪🇭",
    "emojiU": "U+1F1EA U+1F1ED"
  },
  {
    "id": 245,
    "currency": "YER",
    "name": "Yemen",
    "latitude": "15.00000000",
    "longitude": "48.00000000",
    "emoji": "🇾🇪",
    "emojiU": "U+1F1FE U+1F1EA"
  },
  {
    "id": 246,
    "currency": "ZMW",
    "name": "Zambia",
    "latitude": "-15.00000000",
    "longitude": "30.00000000",
    "emoji": "🇿🇲",
    "emojiU": "U+1F1FF U+1F1F2"
  },
  {
    "id": 247,
    "currency": "ZWL",
    "name": "Zimbabwe",
    "latitude": "-20.00000000",
    "longitude": "30.00000000",
    "emoji": "🇿🇼",
    "emojiU": "U+1F1FF U+1F1FC"
  },
  {
    "id": 248,
    "currency": "EUR",
    "name": "Kosovo",
    "latitude": "42.56129090",
    "longitude": "20.34030350",
    "emoji": "🇽🇰",
    "emojiU": "U+1F1FD U+1F1F0"
  },
  {
    "id": 249,
    "currency": "ANG",
    "name": "Curaçao",
    "latitude": "12.11666700",
    "longitude": "-68.93333300",
    "emoji": "🇨🇼",
    "emojiU": "U+1F1E8 U+1F1FC"
  },
  {
    "id": 250,
    "currency": "ANG",
    "name": "Sint Maarten (Dutch part)",
    "latitude": "18.03333300",
    "longitude": "-63.05000000",
    "emoji": "🇸🇽",
    "emojiU": "U+1F1F8 U+1F1FD"
  }
]


export {countries}