<?php

  function br() {
    echo "</br>";
  }

  function toString($bool) {
    return $bool ? "true" : "false";
  }

  /**
   * Determines if the browser provided a valid SSL client certificate
   *
   * @return boolean True if the client cert is there and is valid
   */
  function hasValidCert()
  {
      if (!isset($_SERVER['SSL_CLIENT_M_SERIAL'])
          || !isset($_SERVER['SSL_CLIENT_V_END'])
          || !isset($_SERVER['SSL_CLIENT_VERIFY'])
          || $_SERVER['SSL_CLIENT_VERIFY'] !== 'SUCCESS'
          || !isset($_SERVER['SSL_CLIENT_I_DN'])
      ) {
          return false;
      }
      if ($_SERVER['SSL_CLIENT_V_REMAIN'] <= 0) {
          return false;
      }
      return true;
  }


  
  print("Has valid certificate: " . toString(hasValidCert()));
  if (hasValidCert()) {
    br();
    print("Hallo " . $_SERVER['SSL_CLIENT_S_DN_CN'] . "!");
  }
  br();
  br();
  echo "<ul>";
  foreach ($_SERVER as $key => $value) {
    echo "<li>";
    echo $key . ":" . $value;
    echo "</li>";
  }
  echo "</ul>";
?>
