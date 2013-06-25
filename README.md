web-xml-signer
==============

Web app to sign any XML document using XML Digital Signature with the help of USB tokens or key/certificate files.

![web-xml-signer screenshot](screenshot.png)

Usage
-----

Install [browser plugin](https://esia.gosuslugi.ru/sia-web/plugin/upload/Index.spr) that includes support for PKCS11 USB tokens (eToken, ruToken, and others).

Start the app as any other Sinatra app:

    $ ruby app.rb

Enjoy!

Examples
--------

Directory `/examples` contains some typical applications of this utility.

- Simple [SOAP](http://www.w3.org/TR/soap/) request:
 - [template](/examples/SOAP.xml)
 - [signed](/examples/SOAP_signed.xml)
- [SMEV](http://smev.gosuslugi.ru/) SOAP request (can be validated on [SMEV Portal](http://smev.gosuslugi.ru/portal/services-tools.jsp)):
 - [template](/examples/SMEV.xml)
 - [signed](/examples/SMEV_signed.xml)
