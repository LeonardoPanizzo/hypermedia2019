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
  per performer       artisticEvent/performer/:id
      si passa l'id del performer e si ricevono gli eventi artistici in cui si è esibito

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
  per evento          /performer/artisticEvent/:id
      l'id passato nell'url è l'id dell'evento di cui si vogliono sapere gli artisti

NB. per i metodo qui sotto il server prende l'iduser dal cookie che viene passato automaticamente ad ogni query
per il carrello eventi artistici
    gli eventi di un utente   /cartArtisticEvent/

per il carrello seminari
    i seminari di un utente   /cartSeminar/
