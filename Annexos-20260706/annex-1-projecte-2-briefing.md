# BRIEFING PROJECTE BUDGET: PRESSUPOSTOS DE SERVEIS DIGITALS

Aplicació web per a la generació automàtica de pressupostos de serveis de màrqueting digital i desenvolupament web a mida.

El projecte **Generador de Pressupostos de Serveis Digitals** neix com a resposta a una necessitat detectada dins l’empresa de facilitar als potencials clients la possibilitat de calcular un pressupost inicial de manera ràpida i autònoma, estalviant temps comercial i millorant la conversió de leads.

---

## OBJECTIU DE LA PLATAFORMA

Desenvolupar una plataforma web que permeti a qualsevol usuari seleccionar els serveis digitals que necessita, personalitzar-los si cal, introduir les seves dades i obtenir un pressupost desglossat i amb URL pròpia per poder-lo consultar o reenviar.

## SERVEI ESPERAT

Una aplicació web d’accés public que ofereixi:

* Obtenir i compartir pressupostos automàtics dels serveis digitals oferts,
* Mantenir una col·lecció de pressupostos generats
* Cercar pressupostos generats d'una col·lecció

## NECESSITATS

### Problemes a resoldre

* *Dificultat per obtenir una estimació econòmica ràpida dels serveis oferts*
* *Temps excessiu dedicat pel personal comercial a respostes preliminars i repetitives*
* *Complexitat a l’hora d’explicar al client les opcions i els costos associats als serveis personalitzats*
* *Absència d’una eina interactiva que ajudi a generar confiança i claredat durant el primer contacte amb el client*

### Públic objectiu

El projecte s’adreça a:

#### Clients potencials de serveis digitals

Persones o empreses interessades en serveis de màrqueting digital i desenvolupament web a mida.

1. **Interessos:**

* Saber ràpidament quant pot costar un servei o paquet digital
* Trobar una empresa professional i clara amb els preus
* Evitar reunions inicials innecessàries
* Comparar opcions de serveis abans de decidir-se

2. **Necessitats:**

* Entendre les opcions disponibles i el seu cost
* Poder ajustar el servei web a mida (pàgines, idiomes)
* Rebre un resum clar i descarregable del pressupost
* Consultar o compartir el pressupost des d’un enllaç web i document PDF

#### Equip comercial intern

Professionals encarregats de gestionar els contactes, ofertes i vendes de serveis digitals.

1. **Interessos:**

* Optimitzar el temps dedicat a reunions preliminars
* Tenir un registre dels pressupostos generats
* Ajudar els clients a entendre millor els serveis

2. **Necessitats:**

* Accés a un històric de pressupostos
* Poder consultar les dades del client i els serveis seleccionats
* Disposar d’enllaços per revisar o reenviar pressupostos
* Automatitzar el càlcul del preu per evitar errors

### Requisits funcionals esperats

* Selecció de serveis per checkbox:
  * SEO (300 €)
  * Publicitat (400 €)
  * Web (500 € base + personalització)
* Configurador del servei web (actiu només si es selecciona):
  * Nombre de pàgines
  * Nombre d’idiomes
  * Fórmula: `(pàgines + idiomes) * 30 €` + base web (500 €)
* Formulari de dades del client:
  * Nom i cognoms
  * Correu electrònic
  * Telèfon
* Generació automàtica del pressupost total
* Creació d’una URL única per a cada pressupost amb:
  * Data
  * Dades del client
  * Serveis seleccionats
  * Costos desglossats
  * Preu total
* Històric de pressupostos generats amb:
  * Nom, email, telèfon
  * Data
  * Serveis seleccionats
  * Total
  * Enllaç al detall

### Requisits tècnics esperats

* Ha de ser una **SPA (Single Page Application)**
* El desenvolupament ha de ser **eficient** i ha d’implicar una **dependència mínima del desenvolupador** per fer canvis de contingut o configuració
* Les dades i els textos de l’aplicació han de ser **configurables mitjançant un fitxer JSON o una base de dades**
* S’ha d'utilitzar **React** o **Angular** com a framework principal
* Enfocament *mobile-first* amb disseny intuïtiu
* Backend lleuger amb base de dades per guardar pressupostos (opcionalment amb persistència local en primer MVP json server o local storage)
* Generació d’ID únic per a cada pressupost
* Possibilitat futura d’exportació a PDF
* Desplegament a servidor o plataforma.

### Requisits de UX/UI esperats

El disseny ha de ser:

* Compliment de les directrius WCAG ( *Web Content Accessibility Guidelines* )
* Accessible per a persones amb discapacitats visuals i motores
* Amb respostes clares després de qualsevol acció de l’usuari
* Navegació intuïtiva i flux de passos clar per generar el pressupost
* Contingut jerarquitzat de manera clara
* Bons contrastos, etiquetes ARIA, navegació per teclat
* Flux coherent i orientat a objectius
* Sense punts de fricció innecessaris
* Consistència en els components d’interacció
* Iconografia clara i universal
