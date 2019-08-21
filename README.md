# hypermedia2019
query fatte:
per gli eventi artistici
  tutti gli eventi    /artisticEvent/all
  tutti i tipi        /artisticEvent/types
  quelli di oggi      /artisticEvent/today
  per id              /artisticEvent/:id
      esempio   /artisticEvent/7
  per tipo            /artisticEvent/type/:type
      esempio   /artisticEvent/type/opera

per i seminari
  tutti               /seminar/all
  oggi                /seminar/today
  per id              /seminar/:id
      esempio   /seminar/10

per gli utenti
  login               /user/login
      nel body viene inserito mail e password chiamati "mail" "pass"
  logout              /user/logout
  controllo email     /user/check
      nel body viene inserito la mail, chiamata "mail"
  signup              /user/signup
        nel body viene inserito mail, password e nome chiamati "mail" "password" "name"

per gli artisti
  tutti               /performer/all
  per id              /performer/:id
      esempio   /performer/5
