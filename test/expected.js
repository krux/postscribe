window.expectedBehavior = true && {
  "test simple style": {
    "tag0": {
      "calls": [{
        "0": "<style> h3 {color: blue;}</style>",
        "1": "tag0:<style> h3 {color: blue;}</style>"
      }, {
        "0": "<style> h3 {color: blue;}</style>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<style> h3 {color: blue;}</style>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test string double quote": {
    "tag0": {
      "calls": [{
        "0": "<img alt=\"foo\">",
        "1": "tag0:<img alt=\"foo\">"
      }, {
        "0": "foo"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test string single quote": {
    "tag0": {
      "calls": [{
        "0": "<img alt=\"foo\">",
        "1": "tag0:<img alt='foo'>"
      }, {
        "0": "foo"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test string unquoted": {
    "tag0": {
      "calls": [{
        "0": "<img alt=\"foo\">",
        "1": "tag0:<img alt=foo>"
      }, {
        "0": "foo"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<img alt=\"foo\">",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test empty string": {
    "tag0": {
      "calls": [{
        "0": "<img alt=\"\">",
        "1": "tag0:<img alt=\"\">"
      }, {
        "0": ""
      }, {
        "0": "<img alt=\"\">",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<img alt=\"\">",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test no value": {
    "tag0": {
      "calls": [{
        "0": "<input type=\"checkbox\" checked=\"\">",
        "1": "tag0:<input type=\"checkbox\" checked>"
      }, {
        "0": "checked"
      }, {
        "0": "<input type=\"checkbox\" checked=\"\">",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<input type=\"checkbox\" checked=\"\">",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test remainder": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-and-inline-script.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:A"
      }, {
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-and-inline-script.js?0.6446862138908899\"></script>B"
      }, {
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-and-inline-script.js?0.598975085789406\"></script>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag0:V"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.7673742396495975\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-inline-script.js?0.9413667058749282\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag0:E<script src=\"remote/write-inline-script.js?0.634976922078811\"></script>F"
      }, {
        "0": "VQ",
        "1": "tag0:7<script>document.write(\"5\")</script>8"
      }, {
        "0": "VQ",
        "1": "tag0:Z<script src=\"remote/write-div.js?0.5330864892610078\"></script>N"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
        "1": "tag0:5"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.5514755305717689\"></script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:Q<script src=\"remote/write-inline-script.js?0.881628129065121\"></script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:E<script src=\"remote/write-inline-script.js?0.9560732341490205\"></script>F"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:7<script>document.write(\"5\")</script>8"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ",
        "1": "tag0:Z<script src=\"remote/write-div.js?0.6499746266343855\"></script>N"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
        "1": "tag0:5"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.6891380757977763\"></script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:Q<script src=\"remote/write-inline-script.js?0.22348098260751023\"></script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:E<script src=\"remote/write-inline-script.js?0.5861513478953086\"></script>F"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:7<script>document.write(\"5\")</script>8"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ",
        "1": "tag0:Z<script src=\"remote/write-div.js?0.8126651019765138\"></script>N"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
        "1": "tag0:5"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NAVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>NBVQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test docwrite outside parent of script": {
    "tag0": {
      "calls": [{
        "0": "<div>AB</div>C",
        "1": "tag0:B</div>C"
      }, {
        "0": "<div>AB</div>CD",
        "1": "tag0:<div>A<script type=\"text/javascript\">document.write(\"B</div>C\");</script>D"
      }, {
        "0": "<div>AB</div>CD",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div>AB</div>CD",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test capital script": {
    "tag0": {
      "calls": [{
        "0": "AB",
        "1": "tag0:B"
      }, {
        "0": "ABC",
        "1": "tag0:A<SCRIPT type=\"text/javascript\">document.write(\"B\");</SCRIPT>C"
      }, {
        "0": "ABC",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "ABC",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test capital script@SRC": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<SCRIPT TYPE=\"text/javascript\" SRC=\"remote/write-div.js?0.24039657593810207\"></SCRIPT>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "<div id=\"remote\">remote</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test inline": {
    "tag0": {
      "calls": [{
        "0": "AB",
        "1": "tag0:B"
      }, {
        "0": "ABC",
        "1": "tag0:A<script type=\"text/javascript\">document.write(\"B\");</script>C"
      }, {
        "0": "ABC",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "ABC",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test nested document.write": {
    "tag0": {
      "calls": [{
        "0": "ABC",
        "1": "tag0:C"
      }, {
        "0": "ABCD",
        "1": "tag0:B<script type='text/javascript'>document.write('C');</script>D"
      }, {
        "0": "ABCDE",
        "1": "tag0:A<script type=\"text/javascript\">document.write(\"B<script type='text/javascript'>document.write('C');<\\/script>D\");</script>E"
      }, {
        "0": "ABCDE",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "ABCDE",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test globals": {
    "tag0": {
      "calls": [{
        "0": "footruefalse",
        "1": "tag0:footruefalse"
      }, {
        "0": "footruefalse",
        "1": "tag0:<script>var XQWER = \"foo\";</script><script>document.write(\"\"+window.XQWER + (this === window) + (window === top));</script>"
      }, {
        "0": "footruefalse",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "footruefalse",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test remote then write": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-div.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "<div id=\"remote\">remote</div><div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test double remote": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-div.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script src=\"remote/write-div.js?0.6446862138908899\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "<div id=\"remote\">remote</div><div id=\"local\">Local</div><div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "<div id=\"remote\">remote</div><div id=\"local\">Local</div><div id=\"remote\">remote</div><div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test remote then remote then write": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-script.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag0:V"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.0806029437273227\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test remote => (remote and inline), write": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-and-inline-script.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag0:V"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.0806029437273227\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-inline-script.js?0.7673742396495975\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag0:E<script src=\"remote/write-inline-script.js?0.9413667058749282\"></script>F"
      }, {
        "0": "VQ",
        "1": "tag0:7<script>document.write(\"5\")</script>8"
      }, {
        "0": "VQ",
        "1": "tag0:Z<script src=\"remote/write-div.js?0.634976922078811\"></script>N"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
        "1": "tag0:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
        "1": "tag0:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
        "1": "tag0:5"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test remote then inline then write": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-inline-script.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag0:V"
      }, {
        "0": "VQX",
        "1": "tag0:X"
      }, {
        "0": "VQXS",
        "1": "tag0:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQXST",
        "1": "tag0:T"
      }, {
        "0": "VQXST<div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test remote + global": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script>var global1 = \"inline global1\"</script>"
      }, {
        "0": "",
        "1": "tag0:<script src=\"remote/set-global1.js?0.16475020765143403\"></script>"
      }, {
        "0": "",
        "1": "tag0:<script>document.write(this.global1);</script>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "remote global1",
        "1": "tag0:remote global1"
      }, {
        "0": "remote global1",
        "1": "tag0:Final InnerHtml"
      }]
    }
  },
  "test MULT1": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:<script src=\"remote/write-remote-script.js?0.24039657593810207\"></script>"
      }, {
        "0": "",
        "1": "tag0:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag0:V"
      }, {
        "0": "VQ",
        "1": "tag0:Q<script src=\"remote/write-div.js?0.0806029437273227\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag0:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>",
        "1": "tag0:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>ST<div id=\"local\">Local</div>",
        "1": "tag0:Final InnerHtml"
      }]
    },
    "tag1": {
      "calls": [{
        "0": "",
        "1": "tag1:<script src=\"remote/write-remote-and-inline-script.js?0.863292811925148\"></script>"
      }, {
        "0": "",
        "1": "tag1:<div id=\"local\">Local</div>"
      }, {
        "0": "",
        "1": "tag1:<script class=\"test_cb\">cb_2();//Rendering Complete</script>"
      }, {
        "0": "V",
        "1": "tag1:V"
      }, {
        "0": "VQ",
        "1": "tag1:Q<script src=\"remote/write-div.js?0.9224918391410194\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag1:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag1:Q<script src=\"remote/write-inline-script.js?0.5771939752123214\"></script>S"
      }, {
        "0": "VQ",
        "1": "tag1:T<script>document.write(\"X\")</script>Y"
      }, {
        "0": "VQ",
        "1": "tag1:E<script src=\"remote/write-inline-script.js?0.2926320258052785\"></script>F"
      }, {
        "0": "VQ",
        "1": "tag1:7<script>document.write(\"5\")</script>8"
      }, {
        "0": "VQ",
        "1": "tag1:Z<script src=\"remote/write-div.js?0.145776819747727\"></script>N"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>",
        "1": "tag1:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STX",
        "1": "tag1:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQV",
        "1": "tag1:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQX",
        "1": "tag1:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXS",
        "1": "tag1:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXST",
        "1": "tag1:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTX",
        "1": "tag1:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEV",
        "1": "tag1:V"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQX",
        "1": "tag1:X"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXS",
        "1": "tag1:Q<script>document.write(\"X\")</script>S"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXST",
        "1": "tag1:T"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF75",
        "1": "tag1:5"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>",
        "1": "tag1:<div id=\"remote\">remote</div>"
      }, {
        "0": "VQ<div id=\"remote\">remote</div>STXYQVQXSTSTXYEVQXSTF758Z<div id=\"remote\">remote</div>N<div id=\"local\">Local</div>",
        "1": "tag1:Final InnerHtml"
      }]
    }
  },
  "test empty tag": {
    "tag0": {
      "calls": [{
        "0": "<span>A<input name=\"B\">C</span>D",
        "1": "tag0:<span>A<input name=\"B\">C</span>D"
      }, {
        "0": "<span>A<input name=\"B\">C</span>D",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<span>A<input name=\"B\">C</span>D",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW1": {
    "tag0": {
      "calls": [{
        "0": "<div></div>",
        "1": "tag0:<div>"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:<i>foo"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW2": {
    "tag0": {
      "calls": [{
        "0": "<div></div>",
        "1": "tag0:<div>"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:<i>foo"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i>foo</i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW2-b": {
    "tag0": {
      "calls": [{
        "0": "<div>foo</div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div>foo<div>bar</div></div>",
        "1": "tag0:<div>bar"
      }, {
        "0": "<div>foo<div>bar</div></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div>foo<div>bar</div></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW3": {
    "tag0": {
      "calls": [{
        "0": "<div><i>foo</i></div>",
        "1": "tag0:<div><i>foo"
      }, {
        "0": "<div><i>foo</i><div>bar</div></div>",
        "1": "tag0:</i><div>bar"
      }, {
        "0": "<div><i>foo</i><div>bar</div></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i>foo</i><div>bar</div></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW4": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW5": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>foo",
        "1": "tag0:<div><i></i></div>foo"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW6": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:<i></i></div>bar"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW7": {
    "tag0": {
      "calls": [{
        "0": "<div><div><i></i></div></div>",
        "1": "tag0:<div><div><i></i></div>"
      }, {
        "0": "<div><div><i></i></div>foo</div>",
        "1": "tag0:foo"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:<div>bar</div>"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW8": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><i></i></div>foo<div></div>",
        "1": "tag0:<div>"
      }, {
        "0": "<div><i></i></div>foo<div><i></i></div>",
        "1": "tag0:<i></i>"
      }, {
        "0": "<div><i></i></div>foo<div><i></i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo<div><i></i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW9": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><i></i></div>foo<div>bar</div>",
        "1": "tag0:<div>bar"
      }, {
        "0": "<div><i></i></div>foo<div>bar<i></i></div>",
        "1": "tag0:<i></i>"
      }, {
        "0": "<div><i></i></div>foo<div>bar<i></i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo<div>bar<i></i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test SW10": {
    "tag0": {
      "calls": [{
        "0": "<div><b><i></i></b></div>",
        "1": "tag0:<div><b><i></i></b></div>"
      }, {
        "0": "<div><b><i></i></b></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i></div>",
        "1": "tag0:<div>bar<i>"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
        "1": "tag0:</i>bla"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i>bla</div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test getElementById": {
    "tag0": {
      "calls": [{
        "0": "<div id=\"foo\"><div>bar</div></div>",
        "1": "tag0:<div id=\"foo\"><div>bar"
      }, {
        "0": "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
        "1": "tag0:<i>bla</i></div>"
      }, {
        "0": "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div id=\"foo\"><div>bar<i>bla</i></div><span>baz</span></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS1": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS2": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i>"
      }, {
        "0": "<div><i><div>foo</div></i></div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div><i><div>foo<div><i></i></div></div></i></div>",
        "1": "tag0:<div><i>"
      }, {
        "0": "<div><i><div>foo<div><i></i></div></div></i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i><div>foo<div><i></i></div></div></i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test foo should be italicized": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i>"
      }, {
        "0": "<div><i><div>foo</div></i></div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div><i><div>foo</div></i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i><div>foo</div></i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test inside-out i/p": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:<div>foo"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div><div>foo</div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS5": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS6": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>",
        "1": "tag0:<div>foo<i>"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:</i></div>bar"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div><div>foo<i></i></div>bar",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test character placeholders": {
    "tag0": {
      "calls": [{
        "0": "<div><div><i></i></div></div>",
        "1": "tag0:<div><div><i></i></div>"
      }, {
        "0": "<div><div><i></i></div>foo</div>",
        "1": "tag0:foo"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:<div>bar</div>"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><div><i></i></div>foo<div>bar</div></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test just a close tag": {
    "tag0": {
      "calls": [{
        "0": "",
        "1": "tag0:"
      }, {
        "0": "",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS9": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><i></i></div>foo<div></div>",
        "1": "tag0:<div>"
      }, {
        "0": "<div><i></i></div>foo<div></div>",
        "1": "tag0:</div>"
      }, {
        "0": "<div><i></i></div>foo<div></div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo<div></div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS10": {
    "tag0": {
      "calls": [{
        "0": "<div><i></i></div>",
        "1": "tag0:<div><i></i></div>"
      }, {
        "0": "<div><i></i></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><i></i></div>foo<div>bar</div>",
        "1": "tag0:<div>bar"
      }, {
        "0": "<div><i></i></div>foo<div>bar</div>",
        "1": "tag0:</div>"
      }, {
        "0": "<div><i></i></div>foo<div>bar</div>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><i></i></div>foo<div>bar</div>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test TS11": {
    "tag0": {
      "calls": [{
        "0": "<div><b><i></i></b></div>",
        "1": "tag0:<div><b><i></i></b></div>"
      }, {
        "0": "<div><b><i></i></b></div>foo",
        "1": "tag0:foo"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i></div>",
        "1": "tag0:<div>bar<i>"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
        "1": "tag0:</i></div>bla"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div><b><i></i></b></div>foo<div>bar<i></i></div>bla",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  },
  "test random stuff": {
    "tag0": {
      "calls": [{
        "0": "<div>hey</div>",
        "1": "tag0:<div>hey"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside</div>",
        "1": "tag0:<i>there<div>Continue </div></i>outside"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div></div>",
        "1": "tag0:<div>Not<b> italics<i></i></b></div>"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics</div>",
        "1": "tag0:in italics"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div></div>",
        "1": "tag0:<div>Should also be in italics<i>"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2",
        "1": "tag0:</i></div>in it</div>alics2"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div></b>",
        "1": "tag0:<b><div>hi</div>"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey",
        "1": "tag0:<div>h</div></b>ey"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
        "1": "tag0:<i>there</i>Continue outside<b>please</b>"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
        "1": "tag0:Final InnerHtml"
      }, {
        "0": "<div>hey<i>there<div>Continue </div></i>outside<div>Not<b> italics<i></i></b></div>in italics<div>Should also be in italics<i></i></div>in it</div>alics2<b><div>hi</div><div>h</div></b>ey<i>there</i>Continue outside<b>please</b>",
        "1": "tag0:<script class=\"test_cb\">cb_1();//Rendering Complete</script>"
      }]
    }
  }
};