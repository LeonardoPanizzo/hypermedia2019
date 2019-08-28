# hypermedia2019
query fatte:
per gli eventi artistici
  tutti gli eventi    /artisticEvent/all      (get)
  tutti i tipi        /artisticEvent/types    (get)
  quelli di oggi      /artisticEvent/today    (get)
  per id              /artisticEvent/:id      (get)
      esempio   /artisticEvent/7
  per tipo            /artisticEvent/type/:type (get)
      esempio   /artisticEvent/type/opera
  per performer       /artisticEvent/performer/:id  (get)
      si passa l'id del performer e si ricevono gli eventi artistici in cui si è esibito
  stesso giorno       /artisticEvent/sameDay/:id    (get)
      si passa l'id di un evento restituisce gli eventi che ci sono lo stesso giorno tranne quello che ha l'id uguale a quello passato
  per seminario       /artisticEvent/seminar/:id  (get)
      esempio     /artisticEvent/seminar/5
      restituisce gli eventi artistici relativi al seminario con idseminar=5

per i seminari
  tutti               /seminar/all      (get)
  oggi                /seminar/today    (get)
  per id              /seminar/:id      (get)
      esempio   /seminar/10
  per evento artistico  /seminar/artisticEvent/:id  (get)
      esempio   /seminar/artisticEvent/3
      restituisce i seminari che riguardano l'evento artisco con idevent=3

per gli utenti
  login               /user/login        (post)
      nel body viene inserito mail e password chiamati "mail" "pass"
  logout              /user/logout       (delete)
  controllo email     /user/check        (post)   
      nel body viene inserito la mail, chiamata "mail"
  signup              /user/signup       (post)
        nel body viene inserito mail, password e nome chiamati "mail" "password" "name"

per gli artisti
  tutti               /performer/all    (get)
  per id              /performer/:id    (get)
      esempio   /performer/5
  per evento          /performer/artisticEvent/:id  (get)
      l'id passato nell'url è l'id dell'evento di cui si vogliono sapere gli artisti

NB. per i metodo qui sotto il server prende l'iduser dal cookie che viene passato automaticamente ad ogni query
per il carrello eventi artistici
    gli eventi di un utente   /cartArtisticEvent/     (get)
    per svuotare il carrello  /cartArtisticEvent/     (delete)
    per cancellare un specifico seminario   /cartArtisticEvent/artisticEvent (delete)
        nel body bisogna inserire l'id dell'evento e va chiamato "id"

per il carrello seminari
    i seminari di un utente   /cartSeminar/           (get)
    per svuotare il carrello  /cartSeminar/           (delete)
    per cancellare un specifico seminario   /cartSeminar/seminar (delete)
        nel body bisogna inserire l'id del seminario e va chiamato "id"
    per inserire un seminario nel carrello  /cartSeminar/   (post)
        nel body bisogna inserire l'id del seminario e va chiamato "id"
