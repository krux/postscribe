// FILE GENERATED AUTOMATICALLY. DO NOT MODIFY THIS FILE. THIS FILE IS GIT-IGNORED.
window.expectedBehavior = 
{
  "test simple style": {
    "tag0": {
      "calls": [
        [
          "<style type=\"text/css\">#test_style {background:blue;width:200px;height:300px;border: 2px solid red;}</style><div id=\"test_style\"><img src=\"http://lorempixel.com/100/80/sports/\"></div>",
          "tag0:<style type=\"text/css\">#test_style {background:blue;width:200px;height:300px;border: 2px solid red;}</style><div id=\"test_style\"><img src=\"http://lorempixel.com/100/80/sports/\"/></div>"
        ],
        [
          "<style type=\"text/css\">#test_style {background:blue;width:200px;height:300px;border: 2px solid red;}</style><div id=\"test_style\"><img src=\"http://lorempixel.com/100/80/sports/\"></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<style type=\"text/css\">#test_style {background:blue;width:200px;height:300px;border: 2px solid red;}</style><div id=\"test_style\"><img src=\"http://lorempixel.com/100/80/sports/\"></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test string double quote": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=\"foo\">"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test string single quote": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt='foo'>"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test string unquoted": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=foo>"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test empty string": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"\">",
          "tag0:<img alt=\"\">"
        ],
        [
          ""
        ],
        [
          "<img alt=\"\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test no value": {
    "tag0": {
      "calls": [
        [
          "<input type=\"checkbox\" checked=\"\">",
          "tag0:<input type=\"checkbox\" checked>"
        ],
        [
          "checked"
        ],
        [
          "<input type=\"checkbox\" checked=\"\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<input type=\"checkbox\" checked=\"\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test self closing": {
    "tag0": {
      "calls": [
        [
          "<div class=\"foo\"></div>",
          "tag0:<div class=\"foo\"/>"
        ],
        [
          "<div class=\"foo\"></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div class=\"foo\"></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test remainder": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag0:A"
        ],
        [
          "",
          "tag0:<script src=\"remote/write-remote-and-inline-script.js\"></script>B"
        ],
        [
          "",
          "tag0:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "V",
          "tag0:V"
        ],
        [
          "VQ",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "VQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ",
          "tag0:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "VQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ",
          "tag0:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "VQ",
          "tag0:7<script>document.write(\"5\")</script>8"
        ],
        [
          "VQ",
          "tag0:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag0:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:7<script>document.write(\"5\")</script>8"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag0:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:7<script>document.write(\"5\")</script>8"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag0:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test docwrite outside parent of script": {
    "tag0": {
      "calls": [
        [
          "<div>AB</div>C",
          "tag0:B</div>C"
        ],
        [
          "<div>AB</div>CD",
          "tag0:<div>A<script type=\"text/javascript\">document.write(\"B</div>C\");</script>D"
        ],
        [
          "<div>AB</div>CD",
          "tag0:Final InnerHtml"
        ],
        [
          "<div>AB</div>CD",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test capital script": {
    "tag0": {
      "calls": [
        [
          "AB",
          "tag0:B"
        ],
        [
          "ABC",
          "tag0:A<SCRIPT type=\"text/javascript\">document.write(\"B\");</SCRIPT>C"
        ],
        [
          "ABC",
          "tag0:Final InnerHtml"
        ],
        [
          "ABC",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test different case script": {
    "tag0": {
      "calls": [
        [
          "AB",
          "tag0:B"
        ],
        [
          "ABC",
          "tag0:A<SCRIPT type=\"text/javascript\">document.write(\"B\");</script>C"
        ],
        [
          "ABC",
          "tag0:Final InnerHtml"
        ],
        [
          "ABC",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test capital script@SRC": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<SCRIPT TYPE=\"text/javascript\" SRC=\"remote/write-div.js\"></SCRIPT>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "<div id=\"remote\">remote</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test inline": {
    "tag0": {
      "calls": [
        [
          "AB",
          "tag0:B"
        ],
        [
          "ABC",
          "tag0:A<script type=\"text/javascript\">document.write(\"B\");</script>C"
        ],
        [
          "ABC",
          "tag0:Final InnerHtml"
        ],
        [
          "ABC",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test nested document.write": {
    "tag0": {
      "calls": [
        [
          "ABC",
          "tag0:C"
        ],
        [
          "ABCD",
          "tag0:B<script type='text/javascript'>document.write('C');</script>D"
        ],
        [
          "ABCDE",
          "tag0:A<script type=\"text/javascript\">document.write(\"B<script type='text/javascript'>document.write('C');<\\/script>D\");</script>E"
        ],
        [
          "ABCDE",
          "tag0:Final InnerHtml"
        ],
        [
          "ABCDE",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test globals": {
    "tag0": {
      "calls": [
        [
          "footruefalse",
          "tag0:footruefalse"
        ],
        [
          "footruefalse",
          "tag0:<script>var XQWER = \"foo\";</script><script>document.write(\"\"+window.XQWER + (this === window) + (window === top));</script>"
        ],
        [
          "footruefalse",
          "tag0:Final InnerHtml"
        ],
        [
          "footruefalse",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test remote then write": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-div.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "<div id=\"remote\">remote</div><div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test double remote": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-div.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script src=\"remote/write-div.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "<div id=\"remote\">remote</div><div id=\"local\">Local</div><div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "<div id=\"remote\">remote</div><div id=\"local\">Local</div><div id=\"remote\">remote</div><div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test remote then remote then write": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-remote-script.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "V",
          "tag0:V"
        ],
        [
          "VQ",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "VQ",
          "tag0:T"
        ],
        [
          "VQ",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test remote => (remote and inline), write": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:V"
        ],
        [
          "",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag0:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "",
          "tag0:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag0:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "",
          "tag0:7<script>document.write(\"5\")</script>8"
        ],
        [
          "",
          "tag0:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag0:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag0:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag0:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test remote then inline then write": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-inline-script.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:V"
        ],
        [
          "",
          "tag0:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "",
          "tag0:T"
        ],
        [
          "VQX",
          "tag0:X"
        ],
        [
          "VQXST<div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test remote + global": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script>var global1 = \"inline global1\"</script>"
        ],
        [
          "",
          "tag0:<script src=\"remote/set-global1.js\"></script>"
        ],
        [
          "",
          "tag0:<script>document.write(this.global1);</script>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "remote global1",
          "tag0:remote global1"
        ],
        [
          "remote global1",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test corrupt src": {
    "tag0": {
      "calls": [
        [
          "<img src\"abc.jpg\"=\"\"><div>WORKS</div>",
          "tag0:<img src\"abc.jpg\"><div>WORKS</div>"
        ],
        [
          "<img src\"abc.jpg\"=\"\"><div>WORKS</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<img src\"abc.jpg\"=\"\"><div>WORKS</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test Escaped HTML Entity remote script": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<SCRIPT TYPE=\"text/javascript\" SRC=\"remote&#47;write-div.js\"></SCRIPT>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "<div id=\"remote\">remote</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test Escaped HTML Entity script entity name": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script type=\"text/javascript\" src=\"remote/write-using-query-string.js?k=1&amp;k2=2\"></script>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "k2",
          "tag0:k2"
        ],
        [
          "k2",
          "tag0:Final InnerHtml"
        ]
      ]
    }
  },
  "test HTML entity text to write": {
    "tag0": {
      "calls": [
        [
          "<span><p>foo&amp;/$</p></span>",
          "tag0:<span><p>foo&amp;&#47;&#x00024;</p></span>"
        ],
        [
          "<span><p>foo&amp;/$</p></span>",
          "tag0:Final InnerHtml"
        ],
        [
          "<span><p>foo&amp;/$</p></span>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test Escaped HTML Entity remote image": {
    "tag0": {
      "calls": [
        [
          "<img src=\"http://lorempixel.com/400/200/sports/\" alt=\"image\">",
          "tag0:<img src=\"http&#58;&#47;&#47;lorempixel.com&#47;400&#47;200&#47;sports&#47;\" alt=\"image\"/>"
        ],
        [
          "<img src=\"http://lorempixel.com/400/200/sports/\" alt=\"image\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img src=\"http://lorempixel.com/400/200/sports/\" alt=\"image\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test MULT1": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:<script src=\"remote/write-remote-script.js\"></script>"
        ],
        [
          "",
          "tag0:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ],
        [
          "",
          "tag0:V"
        ],
        [
          "",
          "tag0:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag0:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag0:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
          "tag0:Final InnerHtml"
        ]
      ]
    },
    "tag1": {
      "calls": [
        [
          "",
          "tag1:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag1:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag1:<script class=\"test_helper\">cb_2();//Rendering Complete</script>"
        ],
        [
          "",
          "tag1:V"
        ],
        [
          "",
          "tag1:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag1:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag1:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "",
          "tag1:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag1:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "",
          "tag1:7<script>document.write(\"5\")</script>8"
        ],
        [
          "",
          "tag1:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag1:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag1:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag1:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag1:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag1:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag1:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag1:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag1:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag1:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag1:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag1:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag1:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag1:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
          "tag1:Final InnerHtml"
        ]
      ]
    },
    "tag2": {
      "calls": [
        [
          "",
          "tag2:<script src=\"remote/write-inline-script.js\"></script>"
        ],
        [
          "",
          "tag2:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag2:<script class=\"test_helper\">cb_3();//Rendering Complete</script>"
        ],
        [
          "",
          "tag2:V"
        ],
        [
          "",
          "tag2:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "",
          "tag2:T"
        ],
        [
          "VQX",
          "tag2:X"
        ],
        [
          "VQXST<div id=\"local\">Local</div>",
          "tag2:Final InnerHtml"
        ]
      ]
    },
    "tag3": {
      "calls": [
        [
          "",
          "tag3:<script src=\"remote/write-remote-script.js\"></script>"
        ],
        [
          "",
          "tag3:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag3:<script class=\"test_helper\">cb_4();//Rendering Complete</script>"
        ],
        [
          "",
          "tag3:V"
        ],
        [
          "",
          "tag3:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag3:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag3:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
          "tag3:Final InnerHtml"
        ]
      ]
    },
    "tag4": {
      "calls": [
        [
          "",
          "tag4:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag4:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag4:<script class=\"test_helper\">cb_5();//Rendering Complete</script>"
        ],
        [
          "",
          "tag4:V"
        ],
        [
          "",
          "tag4:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag4:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag4:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "",
          "tag4:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag4:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "",
          "tag4:7<script>document.write(\"5\")</script>8"
        ],
        [
          "",
          "tag4:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag4:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag4:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag4:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag4:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag4:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag4:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag4:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag4:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag4:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag4:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag4:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag4:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag4:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
          "tag4:Final InnerHtml"
        ]
      ]
    },
    "tag5": {
      "calls": [
        [
          "",
          "tag5:<script src=\"remote/write-inline-script.js\"></script>"
        ],
        [
          "",
          "tag5:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag5:<script class=\"test_helper\">cb_6();//Rendering Complete</script>"
        ],
        [
          "",
          "tag5:V"
        ],
        [
          "",
          "tag5:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "",
          "tag5:T"
        ],
        [
          "VQX",
          "tag5:X"
        ],
        [
          "VQXST<div id=\"local\">Local</div>",
          "tag5:Final InnerHtml"
        ]
      ]
    },
    "tag6": {
      "calls": [
        [
          "",
          "tag6:<script src=\"remote/write-remote-script.js\"></script>"
        ],
        [
          "",
          "tag6:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag6:<script class=\"test_helper\">cb_7();//Rendering Complete</script>"
        ],
        [
          "",
          "tag6:V"
        ],
        [
          "",
          "tag6:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag6:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag6:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
          "tag6:Final InnerHtml"
        ]
      ]
    },
    "tag7": {
      "calls": [
        [
          "",
          "tag7:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag7:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag7:<script class=\"test_helper\">cb_8();//Rendering Complete</script>"
        ],
        [
          "",
          "tag7:V"
        ],
        [
          "",
          "tag7:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag7:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag7:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "",
          "tag7:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag7:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "",
          "tag7:7<script>document.write(\"5\")</script>8"
        ],
        [
          "",
          "tag7:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag7:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag7:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag7:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag7:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag7:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag7:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag7:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag7:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag7:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag7:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag7:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag7:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag7:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
          "tag7:Final InnerHtml"
        ]
      ]
    },
    "tag8": {
      "calls": [
        [
          "",
          "tag8:<script src=\"remote/write-inline-script.js\"></script>"
        ],
        [
          "",
          "tag8:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag8:<script class=\"test_helper\">cb_9();//Rendering Complete</script>"
        ],
        [
          "",
          "tag8:V"
        ],
        [
          "",
          "tag8:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "",
          "tag8:T"
        ],
        [
          "VQX",
          "tag8:X"
        ],
        [
          "VQXST<div id=\"local\">Local</div>",
          "tag8:Final InnerHtml"
        ]
      ]
    },
    "tag9": {
      "calls": [
        [
          "",
          "tag9:<script src=\"remote/write-remote-script.js\"></script>"
        ],
        [
          "",
          "tag9:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag9:<script class=\"test_helper\">cb_10();//Rendering Complete</script>"
        ],
        [
          "",
          "tag9:V"
        ],
        [
          "",
          "tag9:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag9:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag9:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
          "tag9:Final InnerHtml"
        ]
      ]
    },
    "tag10": {
      "calls": [
        [
          "",
          "tag10:<script src=\"remote/write-remote-and-inline-script.js\"></script>"
        ],
        [
          "",
          "tag10:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag10:<script class=\"test_helper\">cb_11();//Rendering Complete</script>"
        ],
        [
          "",
          "tag10:V"
        ],
        [
          "",
          "tag10:Q<script src=\"remote/write-div.js\"></script>S"
        ],
        [
          "",
          "tag10:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag10:Q<script src=\"remote/write-inline-script.js\"></script>S"
        ],
        [
          "",
          "tag10:T<script>document.write(\"X\")</script>Y"
        ],
        [
          "",
          "tag10:E<script src=\"remote/write-inline-script.js\"></script>F"
        ],
        [
          "",
          "tag10:7<script>document.write(\"5\")</script>8"
        ],
        [
          "",
          "tag10:Z<script src=\"remote/write-div.js\"></script>N"
        ],
        [
          "VQ<div id=\"remote\">remote</div>",
          "tag10:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STX",
          "tag10:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQV",
          "tag10:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQX",
          "tag10:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXS",
          "tag10:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXST",
          "tag10:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
          "tag10:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
          "tag10:V"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
          "tag10:X"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
          "tag10:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
          "tag10:T"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
          "tag10:5"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
          "tag10:<div id=\"remote\">remote</div>"
        ],
        [
          "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
          "tag10:Final InnerHtml"
        ]
      ]
    },
    "tag11": {
      "calls": [
        [
          "",
          "tag11:<script src=\"remote/write-inline-script.js\"></script>"
        ],
        [
          "",
          "tag11:<div id=\"local\">Local</div>"
        ],
        [
          "",
          "tag11:<script class=\"test_helper\">cb_12();//Rendering Complete</script>"
        ],
        [
          "",
          "tag11:V"
        ],
        [
          "",
          "tag11:Q<script>document.write(\"X\")</script>S"
        ],
        [
          "",
          "tag11:T"
        ],
        [
          "VQX",
          "tag11:X"
        ],
        [
          "VQXST<div id=\"local\">Local</div>",
          "tag11:Final InnerHtml"
        ]
      ]
    }
  },
  "test Handles closed self-closing tags that're closed.": {
    "tag0": {
      "calls": [
        [
          "<div id=\"first\" style=\"background: red; padding: 5px\"><embed></div><div id=\"second\" style=\"background: yellow\">Should be yellow in red box, right?</div>\n",
          "tag0:<div id=\"first\" style=\"background: red; padding: 5px\"><embed></div><div id=\"second\" style=\"background: yellow\">Should be yellow in red box, right?</div>\n"
        ],
        [
          "<div id=\"first\" style=\"background: red; padding: 5px\"><embed></div><div id=\"second\" style=\"background: yellow\">Should be yellow in red box, right?</div>\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<div id=\"first\" style=\"background: red; padding: 5px\"><embed></div><div id=\"second\" style=\"background: yellow\">Should be yellow in red box, right?</div>\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test Handles closed self-closing tags that're closed w/ a slash.": {
    "tag0": {
      "calls": [
        [
          "<div><object><param name=\"allowFullScreen\" value=\"true\"><param></object></div>\n",
          "tag0:<div><object><param name=\"allowFullScreen\" value=\"true\" /><param></object></div>\n"
        ],
        [
          "<div><object><param name=\"allowFullScreen\" value=\"true\"><param></object></div>\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><object><param name=\"allowFullScreen\" value=\"true\"><param></object></div>\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test empty tag": {
    "tag0": {
      "calls": [
        [
          "<span>A<input name=\"B\">C</span>D",
          "tag0:<span>A<input name=\"B\">C</span>D"
        ],
        [
          "<span>A<input name=\"B\">C</span>D",
          "tag0:Final InnerHtml"
        ],
        [
          "<span>A<input name=\"B\">C</span>D",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW1": {
    "tag0": {
      "calls": [
        [
          "<div></div>",
          "tag0:<div>"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:<i>foo"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW2": {
    "tag0": {
      "calls": [
        [
          "<div></div>",
          "tag0:<div>"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:<i>foo"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i>foo</i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW2-b": {
    "tag0": {
      "calls": [
        [
          "<div>foo</div>",
          "tag0:<div>foo"
        ],
        [
          "<div>foo<div>bar</div></div>",
          "tag0:<div>bar"
        ],
        [
          "<div>foo<div>bar</div></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div>foo<div>bar</div></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW3": {
    "tag0": {
      "calls": [
        [
          "<div><i>foo</i></div>",
          "tag0:<div><i>foo"
        ],
        [
          "<div><i>foo</i><div>bar</div></div>",
          "tag0:</i><div>bar"
        ],
        [
          "<div><i>foo</i><div>bar</div></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i>foo</i><div>bar</div></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW4": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:<div>foo"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW5": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>foo",
          "tag0:<div><i></i></div>foo"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW6": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:<div>foo"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:<i></i></div>bar"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW7": {
    "tag0": {
      "calls": [
        [
          "<div><div><i></i></div></div>",
          "tag0:<div><div><i></i></div>"
        ],
        [
          "<div><div><i></i></div>foo</div>",
          "tag0:foo"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:<div>bar</div>"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW8": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:foo"
        ],
        [
          "<div><i></i></div>foo<div></div>",
          "tag0:<div>"
        ],
        [
          "<div><i></i></div>foo<div><i></i></div>",
          "tag0:<i></i>"
        ],
        [
          "<div><i></i></div>foo<div><i></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div><i></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW9": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:foo"
        ],
        [
          "<div><i></i></div>foo<div>bar</div>",
          "tag0:<div>bar"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:<i></i>"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test SW10": {
    "tag0": {
      "calls": [
        [
          "<div><b><i></i></b></div>",
          "tag0:<div><b><i></i></b></div>"
        ],
        [
          "<div><b><i></i></b></div>foo",
          "tag0:foo"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i></div>",
          "tag0:<div>bar<i>"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:</i>bla"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test getElementById": {
    "tag0": {
      "calls": [
        [
          "<div id=\"foo\"><div>bar</div></div>",
          "tag0:<div id=\"foo\"><div>bar"
        ],
        [
          "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
          "tag0:<i>bla</i></div>"
        ],
        [
          "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS1": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:foo"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS2": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i>"
        ],
        [
          "<div><i><div>foo</div></i></div>",
          "tag0:<div>foo"
        ],
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:<div><i>"
        ],
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test foo should be italicized": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i>"
        ],
        [
          "<div><i><div>foo</div></i></div>",
          "tag0:<div>foo"
        ],
        [
          "<div><i><div>foo</div></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i><div>foo</div></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test inside-out i/p": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:<div>foo"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div><div>foo</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS5": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS6": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>",
          "tag0:<div>foo<i>"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:</i></div>bar"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div><div>foo<i></i></div>bar",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test character placeholders": {
    "tag0": {
      "calls": [
        [
          "<div><div><i></i></div></div>",
          "tag0:<div><div><i></i></div>"
        ],
        [
          "<div><div><i></i></div>foo</div>",
          "tag0:foo"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:<div>bar</div>"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><div><i></i></div>foo<div>bar</div></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test just a close tag": {
    "tag0": {
      "calls": [
        [
          "",
          "tag0:"
        ],
        [
          "",
          "tag0:Final InnerHtml"
        ],
        [
          "",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS9": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:foo"
        ],
        [
          "<div><i></i></div>foo<div></div>",
          "tag0:<div>"
        ],
        [
          "<div><i></i></div>foo<div></div>",
          "tag0:</div>"
        ],
        [
          "<div><i></i></div>foo<div></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS10": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>",
          "tag0:<div><i></i></div>"
        ],
        [
          "<div><i></i></div>foo",
          "tag0:foo"
        ],
        [
          "<div><i></i></div>foo<div>bar</div>",
          "tag0:<div>bar"
        ],
        [
          "<div><i></i></div>foo<div>bar</div>",
          "tag0:</div>"
        ],
        [
          "<div><i></i></div>foo<div>bar</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div>bar</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test TS11": {
    "tag0": {
      "calls": [
        [
          "<div><b><i></i></b></div>",
          "tag0:<div><b><i></i></b></div>"
        ],
        [
          "<div><b><i></i></b></div>foo",
          "tag0:foo"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i></div>",
          "tag0:<div>bar<i>"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
          "tag0:</i></div>bla"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test random stuff": {
    "tag0": {
      "calls": [
        [
          "<div>hey</div>",
          "tag0:<div>hey"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside</div>",
          "tag0:<i>there<div>Continue </div></i>outside"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div></div>",
          "tag0:<div>Not<b> italics<i></i></b></div>"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics</div>",
          "tag0:in italics"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div></div>",
          "tag0:<div>Should also be in italics<i>"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2",
          "tag0:</i></div>in it</div>alics2"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div></b>",
          "tag0:<b><div>hi</div>"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey",
          "tag0:<div>h</div></b>ey"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
          "tag0:<i>there</i>Continue outside<b>please</b>"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test iframe with script content": {
    "tag0": {
      "calls": [
        [
          "<iframe></iframe>",
          "tag0:<iframe><script></script></iframe>"
        ],
        [
          "<iframe></iframe>",
          "tag0:<script>document.write(\"<iframe><script><\\/script></iframe>\")</script>"
        ],
        [
          "<iframe></iframe>",
          "tag0:Final InnerHtml"
        ],
        [
          "<iframe></iframe>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test textarea with script content": {
    "tag0": {
      "calls": [
        [
          "<textarea>&lt;script&gt;&lt;/script&gt;</textarea>",
          "tag0:<textarea><script></script></textarea>"
        ],
        [
          "<textarea>&lt;script&gt;&lt;/script&gt;</textarea>",
          "tag0:<script>document.write(\"<textarea><script><\\/script></textarea>\")</script>"
        ],
        [
          "<textarea>&lt;script&gt;&lt;/script&gt;</textarea>",
          "tag0:Final InnerHtml"
        ],
        [
          "<textarea>&lt;script&gt;&lt;/script&gt;</textarea>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: split mid-element": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=\"foo\">"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: split mid-attribute": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=\"foo\">"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: split mid-attribute-value": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=\"foo\">"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: empty strings": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">",
          "tag0:<img alt=\"foo\">"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: docwrite outside parent of script": {
    "tag0": {
      "calls": [
        [
          "<div>AB</div>C",
          "tag0:B</div>C"
        ],
        [
          "<div>AB</div>CD",
          "tag0:<div>A<script type=\"text/javascript\">\ndocument.write(\"B</div>C\");\n</script>D"
        ],
        [
          "<div>AB</div>CD",
          "tag0:Final InnerHtml"
        ],
        [
          "<div>AB</div>CD",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: SW9": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:<div><i></i></div>foo<div>bar<i></i>"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: SW10": {
    "tag0": {
      "calls": [
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:<div><b><i></i></b></div>foo<div>bar<i></i>bla"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wma: TS2": {
    "tag0": {
      "calls": [
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:<div><i><div>foo<div><i>"
        ],
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i><div>foo<div><i></i></div></div></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: split mid-element": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">\n",
          "tag0:<img alt=\"foo\">\n"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: split mid-attribute": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">\n",
          "tag0:<img alt=\"foo\">\n"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: split mid-attribute-value": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">\n",
          "tag0:<img alt=\"foo\">\n"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: empty strings": {
    "tag0": {
      "calls": [
        [
          "<img alt=\"foo\">\n",
          "tag0:<img alt=\"foo\">\n"
        ],
        [
          "foo"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<img alt=\"foo\">\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: docwrite outside parent of script": {
    "tag0": {
      "calls": [
        [
          "<div>AB</div>C",
          "tag0:B</div>C"
        ],
        [
          "<div>AB</div>CD\n",
          "tag0:<div>A<script type=\"text/javascript\">\ndocument.write(\"B</div>C\");\n</script>D\n"
        ],
        [
          "<div>AB</div>CD\n",
          "tag0:Final InnerHtml"
        ],
        [
          "<div>AB</div>CD\n",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: SW9": {
    "tag0": {
      "calls": [
        [
          "<div><i></i></div>foo<div>bar<i></i>\n</div>",
          "tag0:<div><i></i></div>foo<div>bar<i></i>\n"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i>\n</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i></i></div>foo<div>bar<i></i>\n</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: SW10": {
    "tag0": {
      "calls": [
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla\n</div>",
          "tag0:<div><b><i></i></b></div>foo<div>bar<i></i>bla\n"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla\n</div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><b><i></i></b></div>foo<div>bar<i></i>bla\n</div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  },
  "test wlma: TS2": {
    "tag0": {
      "calls": [
        [
          "<div><i><div>foo<div><i>\n</i></div></div></i></div>",
          "tag0:<div><i><div>foo<div><i>\n"
        ],
        [
          "<div><i><div>foo<div><i>\n</i></div></div></i></div>",
          "tag0:Final InnerHtml"
        ],
        [
          "<div><i><div>foo<div><i>\n</i></div></div></i></div>",
          "tag0:<script class=\"test_helper\">cb_1();//Rendering Complete</script>"
        ]
      ]
    }
  }
};