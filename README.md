# hypermedia2019
query fatte:
per gli eventi artistici
  tutti gli eventi    /artisticEvent/all
  tutti i tipi        /artisticEvent/type
      nel body viene inserito il tipo che sarà chiamato "type"
  quelli di oggi      /artisticEvent/today

per i seminari
  tutti               /seminar/all
  oggi                /seminar/today

per gli utenti
  login               /user/login
      nel body viene inserito mail e password chiamati "mail" "pass"
  logout              /user/logout
  controllo email     /user/check
      nel body viene inserito la mail, chiamata "mail"
  signup              /user/signup
        nel body viene inserito mail, password e nome chiamati "mail" "password" "name"
