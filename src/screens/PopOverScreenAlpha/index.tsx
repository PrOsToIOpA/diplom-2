import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '../../utils/navigation';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {lightBlue, white} from '../../utils/constants/colors';

import IconCrossGradient from '../../../assets/svg/cross-gradient.svg';
import {IRootReducer} from '../../store/reducers';
import {setFullResponse} from '../../store/actions/authActions';

const Url = ({text, url}: {text: string; url?: string}) => {
  const onPress = () => {
    Linking.openURL(url || text).catch(e => console.log('error', e));
  };
  return (
    <Text onPress={onPress} style={{color: lightBlue}}>
      {text}
    </Text>
  );
};

const PopOver = () => {
  const {access_token, expires_in, token_type, refresh_token, spoil_token} =
    useSelector((state: IRootReducer) => state.signingReducer);
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <View
        style={{
          marginHorizontal: calcWidth(20),
          marginBottom: calcHeight(20),
          flex: 1,
        }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
            <IconCrossGradient {...styles.iconCrossGradient} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 8}}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/*<Text>{'\n'}</Text>*/}
            <Text style={[styles.header, {fontSize: calcFontSize(23)}]}>
              Algemene voorwaarden
            </Text>
            <Text style={styles.text}>
              {'Deze gebruiksvoorwaarden zijn van toepassing op ieder gebruik dat je van Affiliate Marketing Group BV maakt, een en ander zoals hieronder gedefinieerd.\n' +
                '\n' +
                'Wij adviseren je deze Gebruiksvoorwaarden zorgvuldig te lezen zodat je op de hoogte bent van jouw rechten en verplichtingen als je gebruik maakt van de diensten van Affiliate Marketing Group BV.'}
            </Text>
            <Text style={styles.header}>Artikel 1. Definities</Text>
            <Text style={styles.text}>
              {'1.1 In deze Gebruiksvoorwaarden worden de volgende begrippen met een beginhoofdletter gebruikt, zowel in enkelvoud als in meervoud. Onder deze begrippen wordt het volgende verstaan:\n' +
                '\n' +
                'Aankoop: een door Gebruiker via de website van een Partner gedane aankoop na welke Aankoop de Gebruiker Credits kan verdienen indien aan de daarvoor gestelde voorwaarden wordt voldaan;\n' +
                '\n' +
                'Bezoeker: persoon die geen Profiel heeft aangemaakt, maar wel de Website bezoekt en daardoor toegang heeft tot Reviews;\n' +
                '\n' +
                'Content: alle informatie, gegevens of bestanden die door Gebruikers via de Website beschikbaar worden gesteld;\n' +
                '\n' +
                "Credit: virtuele waarde-eenheid binnen de Dienst, bestaande uit cashback. Je kan Credits verdienen door Aankopen te doen, welke Credits een directe nominale geldelijke waarde in euro's vertegenwoordigen;\n" +
                '\n' +
                'Dienst: de dienst die Affiliate Marketing Group BV aan de Gebruiker verleent, zoals omschreven in art. 3;\n' +
                '\n' +
                'Gebruiker: persoon die een Profiel heeft en gebruik maakt van de Diensten;\n' +
                '\n' +
                'Gebruiksvoorwaarden: deze gebruiksvoorwaarden;\n' +
                '\n' +
                'Inloggegevens: de gebruikersnaam en het wachtwoord van de Gebruiker waarmee hij toegang krijgt tot zijn Profiel en gebruik kan maken van de Dienst;\n' +
                '\n' +
                'Intellectuele Eigendomsrechten: alle rechten van intellectuele eigendom en daarmee verwante rechten, zoals auteursrechten, merkrechten, databankrechten en naburige rechten, alsmede rechten op knowhow en eenlijnsprestaties;\n' +
                '\n' +
                'Partij: een partij (de Gebruiker en/of Raboom) bij deze Gebruiksvoorwaarden;\n' +
                '\n' +
                'Partner: een bij Affiliate Marketing Group BV aangesloten webshop, alwaar een Gebruiker door het doen van een Aankoop Credits kan verzamelen;'}
            </Text>
            <Text style={styles.text}>
              {
                '\nPrivacy Statement: het privacy statement van, beschikbaar via\n'
              }
              <Url text="https://www.raboom.nl/privacy-policy" />;
            </Text>
            <Text style={styles.text}>
              {'\nProfiel: een namens Gebruiker door Affiliate Marketing Group BV aangemaakte afgesloten persoonlijke pagina van Gebruiker, waar de Gebruiker zijn verdiende Credits, en overige informatie kan inzien;\n' +
                '\n' +
                'Website: de website die door Affiliate Marketing Group BV ter beschikking wordt gesteld voor Gebruiker.'}
            </Text>
            <Text style={styles.text}>
              {'\n'}
              <Url text="www.raboom.nl" url="https://raboom.nl/" />
              {
                ' (Raboom) is onderdeel van de besloten vennootschap Affiliate Marketing Group B.V., kantoorhoudende te (1054WH) Amsterdam, aan de Wilhelminastraat 12-3 en ingeschreven in het register van de Kamer van Koophandel onder nummer 64317919; Bereikbaar via de contactpagina van Affiliate Marketing Group BV.'
              }
            </Text>
            <Text style={styles.header}>Artikel 2. Algemeen</Text>
            <Text style={styles.text}>
              {
                '2.1. Affiliate Marketing Group BV is te allen tijde gerechtigd deze Gebruiksvoorwaarden te wijzigen en/of aan te vullen. De meest actuele Gebruiksvoorwaarden zullen op de Website ('
              }
              <Url text="https://www.raboom.nl/algemene-voorwaarden" />
              {
                ') te vinden zijn of worden tijdens het gebruik van de Dienst onder de aandacht van de Gebruiker gebracht. Indien de Gebruiker niet instemt met de gewijzigde en/of aangevulde Gebruiksvoorwaarden, is zijn of haar enige mogelijkheid om de Dienst niet meer te gebruiken en zijn of haar Profiel te (laten) verwijderen.'
              }
              {'\n\n' +
                '2.2. Partijen wijzen uitdrukkelijk de toepasselijkheid van eventuele (algemene) voorwaarden van de Gebruiker of van derden van de hand.'}
            </Text>
            <Text style={styles.header}>Artikel 3. De Dienst</Text>
            <Text style={styles.text}>
              {'3.1. De Dienst biedt Gebruikers de mogelijkheid om een Profiel te plaatsen en daartoe toegang te verkrijgen, op welk Profiel de Gebruiker Credits kan verzamelen en kan inzien door middel van het doen van Aankopen bij Partners – na via de Website te zijn doorverwezen naar de website van deze Partner – en welke Credits de Gebruiker na een daartoe strekkend verzoek door Affiliate Marketing Group BV kan laten uitbetalen.\n' +
                '\n' +
                '3.2. Op de Website kunnen nadere voorwaarden gesteld worden waaronder de Gebruiker gebruik kan maken van de Dienst. Deze nadere voorwaarden hebben onder meer betrekking op de wijze waarop Profielen kunnen worden aangemaakt, Credits kunnen worden verdiend en worden uitgekeerd.\n' +
                '\n' +
                '3.3. Affiliate Marketing Group BV aanvaardt geen enkele aansprakelijkheid voor de juistheid, volledigheid en actualiteit van de informatie op de Website, alsmede de gegevens, aanbiedingen en overige informatie met betrekking tot Partners.'}
            </Text>
            <Text style={styles.header}>
              Artikel 4. Toegang tot de Dienst en beschikbaarheid
            </Text>
            <Text style={styles.text}>
              {'4.1. Om gebruik te kunnen maken van de gehele Dienst moet de Gebruiker een Profiel aanmaken op de manier zoals beschreven op de Website. Het is uitdrukkelijk niet toegestaan een Profiel op naam van een ander aan te maken. Tijdens de registratie moet de Gebruiker Inloggegevens opgeven, waarmee toegang kan worden verkregen tot zijn Profiel.\n' +
                '\n' +
                '4.2. De Gebruiker is zelf verantwoordelijk voor het geheim houden van zijn Inloggegevens. Het is de Gebruiker niet toegestaan zijn Inloggegevens aan derden te verstrekken. De Gebruiker is aansprakelijk voor al het gebruik dat via de Inloggegevens van de Dienst wordt gemaakt. Affiliate Marketing Group BV mag ervan uitgaan dat de Gebruiker daadwerkelijk degene is die zich aanmeldt met zijn Inloggegevens. Zodra de Gebruiker weet of reden heeft te vermoeden dat Inloggegevens in handen zijn gekomen van onbevoegden, moet de Gebruiker Affiliate Marketing Group BV daarvan op de hoogte stellen, onverminderd zijn eigen verplichting om direct zelf doeltreffende maatregelen te treffen, zoals het veranderen van de het wachtwoord. Affiliate Marketing Group BV is niet aansprakelijk voor schade die voortvloeit uit enige ongeoorloofde toegang tot of gebruik van het Profiel en/of Dienst door derden.\n' +
                '\n' +
                '4.3. Affiliate Marketing Group BV is te allen tijde gerechtigd om, zonder voorafgaande bekendmaking en zonder op enigerlei wijze schadeplichtig of aansprakelijk te worden jegens de Gebruiker, (i) procedurele en technische wijzigingen en/of verbeteringen op de Website en/of in de Dienst aan te brengen en (ii) de Dienst of het Profiel van de Gebruiker (tijdelijk of blijvend) buiten gebruik te stellen, te beperken of te beëindigen.\n' +
                '\n' +
                '4.4. Affiliate Marketing Group BV garandeert niet dat (alle onderdelen van) de Website en de Dienst te allen tijde en zonder onderbrekingen of storingen toegankelijk zijn. Affiliate Marketing Group BV is op geen enkele wijze aansprakelijk of schadeplichtig jegens de Gebruiker voor enige schade die voortvloeit uit of het gevolg is van het (tijdelijk) onbeschikbaar zijn of (tussentijds) uitvallen van de Website en/of de Dienst.\n' +
                '\n' +
                '4.5 .De Gebruiker en Bezoeker aanvaardt dat de Website en de Dienst alleen de functionaliteiten en overige eigenschappen bevatten zoals hij die aantreft op de Website en/of Dienst op het moment van gebruik (op “as is” basis). Affiliate Marketing Group BV sluit uitdrukkelijke en stilzwijgende garanties, toezeggingen en vrijwaringen van welke aard dan ook nadrukkelijk uit, waaronder begrepen maar niet beperkt tot garanties, toezeggingen en vrijwaringen ten aanzien van de kwaliteit, veiligheid, rechtmatigheid, integriteit en juistheid van de Website en de Dienst, tenzij anders is bepaald in deze Gebruiksvoorwaarden.\n' +
                '\n' +
                '4.6. De Gebruiker is zelf verantwoordelijk voor de aanschaf en/of goede werking van de infrastructuur en deugdelijke telecomfaciliteiten (waaronder internetverbinding) die nodig zijn om gebruik te kunnen maken van de Dienst.\n' +
                '\n' +
                '4.7. In aanvulling op de andere (rechts)middelen die Affiliate Marketing Group BV ten dienste staan, is Affiliate Marketing Group BV te allen tijde, indien zij daartoe gronden aanwezig acht, zonder opgave van redenen en zonder voorafgaande uitleg gerechtigd om de activiteiten van Gebruiker in verband met de Dienst (tijdelijk) te beperken, op te schorten of buiten gebruik te stellen, het Profiel tijdelijk of blijvend te verwijderen, bestanden, gegevens en/of materialen te verwijderen, een waarschuwing te doen uitgaan, de dienstverlening te beëindigen en te weigeren om diensten te verlenen, in het bijzonder - maar niet daartoe beperkt - indien:\n' +
                '(i) Gebruiker handelt in strijd met deze Gebruiksvoorwaarden;\n' +
                '(ii) Affiliate Marketing Group BV van mening is dat handelingen van Gebruiker schade of aansprakelijkheid aan hem zelf, andere Gebruikers, derden of Affiliate Marketing Group BV kunnen toebrengen. Affiliate Marketing Group BV zal hierdoor in geen geval aansprakelijk zijn.'}
            </Text>
            <Text style={styles.header}>Artikel 5. Gebruik van de Dienst</Text>
            <Text style={styles.text}>
              {'5.1. Gebruiker erkent en aanvaardt dat Affiliate Marketing Group BV slechts een Website biedt waarmee Gebruikers naar websites van Partners worden verwezen, waarna de Gebruiker een Aankoop kan doen. De Gebruiker is zelf volledig verantwoordelijk en aansprakelijk voor alle handelingen die hij met behulp van de Website en/of de Dienst verricht, derhalve is Affiliate Marketing Group BV nooit aansprakelijk voor:\n' +
                'a) de inhoud van de website en overige informatie van haar Partners en/of derden;\n' +
                'b) voor welke beslissing van een Gebruiker dan ook genomen op basis van Content of de inhoud van de website van een Partner;\n' +
                'c) enig handelen van Partners en/of een derde.\n' +
                '\n' +
                '5.2. Affiliate Marketing Group BV wordt nooit partij bij enige overeenkomst tussen Gebruiker en een Partner of een derde.\n' +
                '\n' +
                '5.3. Het is de Gebruiker niet toegestaan om:\n' +
                'a. Credits (trachten) te verzamelen door middel van frauduleus gedrag ten aanzien van hyperlinks, cookies, het omzeilen van beveiligingstechnieken en/of overige wijzen die niet zijn beschreven in deze Gebruiksvoorwaarden;\n' +
                'b. de via de Dienst verkregen Content te verveelvoudigen, openbaar te maken, door te verkopen, te gebruiken voor commerciële doeleinden of anderszins ter beschikking te stellen aan derden;\n' +
                'c. de Dienst te gebruiken voor andere doeleinden dan beschreven in deze Gebruiksvoorwaarden;\n' +
                'd. derden in te schakelen om één van de in dit artikel vermelde handelingen te verrichten.\n\n'}
              <Text>
                5.4 Affiliate Marketing Group BV behoudt te allen tijde het
                recht om Gebruiker toegang te ontzeggen tot{' '}
              </Text>
              <Url text="www.raboom.nl" url="https://raboom.nl/" />
              <Text>. Bijvoorbeeld wanneer:</Text>
              <Text>
                a) Gebruiker als inactief wordt beschouwd en langer dan een jaar
                niet heeft ingelogd op{' '}
              </Text>
              <Url text="www.raboom.nl" url="https://raboom.nl/" />.
            </Text>
            <Text style={styles.header}>Artikel 6. Credits</Text>
            <Text style={styles.text}>
              {'6.1. Gebruiker heeft enkel en alleen recht op Credits indien deze aan de volgende voorwaarden voldoet:\n' +
                'a. de Gebruiker is door middel van zijn Inloggegevens ingelogd op zijn Profiel;\n' +
                'b. de Gebruiker is via een klikbare hyperlink op de Website doorverwezen naar de website van een Partner;\n' +
                'c. de Gebruiker verricht de Aankoop bij een Partner in dezelfde browsersessie als de browsersessie waarin de Gebruiker verkeerde ten tijde van het uitvoeren van de handeling onder b.\n' +
                '\n' +
                '6.2. Gebruiker begrijpt en erkent dat het toestaan van cookies van Affiliate Marketing Group BV en van Partners essentieel is om voor het verdienen van Credits in aanmerking te komen. Affiliate Marketing Group BV heeft geen zeggenschap over het accepteren van deze cookies door Gebruiker en Gebruiker is zelf volledig verantwoordelijk en aansprakelijk voor de correcte acceptatie van deze cookies om voor Credits in aanmerking te komen.\n' +
                '\n' +
                '6.3. Gebruiker heeft enkel en alleen recht op het ontvangen van Credits indien deze een daartoe strekkende melding/e-mail van de Partner heeft ontvangen. Gebruiker zal de in de vorige volzin bedoelde melding op eerste verzoek aan Affiliate Marketing Group BV voorleggen.\n' +
                '\n' +
                '6.4. De Partner waar de Aankoop is verricht beslist of Gebruiker daadwerkelijk recht heeft op Credits en Affiliate Marketing Group BV aanvaardt dan ook geen enkele aansprakelijkheid met betrekking tot het al dan niet uitkeren van (het juiste aantal) Credits. De Gebruiker vrijwaart Affiliate Marketing Group BV van iedere vordering die betrekking heeft op het niet toekennen van (voldoende) Credits.\n' +
                '\n' +
                '6.5. Indien Gebruiker stelt recht te hebben op (een hoger aantal) Credits na het doen van een Aankoop bij een Partner, dient de Gebruiker zijn aankoopbevestiging aan Affiliate Marketing Group BV te overhandigen, welke aankoopbevestiging Affiliate Marketing Group BV vervolgens aan de Partner zal voorleggen. De Partner is voorts geheel verantwoordelijk om, naar eigen inzicht, een dergelijk verzoek tot uitkeren van (extra) Credits te beoordelen, en Affiliate Marketing Group BV aanvaardt geen enkele aansprakelijkheid ten aanzien van een in deze kwestie door de Partner genomen beslissing.\n' +
                '\n' +
                '6.6. Indien aan alle vereisten met betrekking tot het vergaren van Credits is voldaan en de Partner goedkeuring heeft verleend met betrekking tot het uitkeren van Credits, spant Affiliate Marketing Group BV zich in om het aantal opeisbare Credits waar de Gebruiker recht op heeft op het Profiel van de Gebruiker weer te geven binnen maximaal 5 dagen nadat het (wettelijke) herroepingsrecht dat de Gebruiker ten aanzien van deze Aankoop bezit is verstreken, tenzij Affiliate Marketing Group BV op de Website meldt dat de uitkering van Credits langer duurt.\n' +
                '\n' +
                '6.7. Affiliate Marketing Group BV is te allen tijde gerechtigd om het aantal werkelijk aan Gebruiker uit te keren Credits af te ronden, te verhogen of anderszins aan te passen, bijvoorbeeld indien de hoogte van de door een Partner uitgekeerde vergoeding wordt gewijzigd of indien Affiliate Marketing Group BV vermoedt dat de Credits door middel van frauduleus gedrag van Gebruiker zijn verkregen.\n' +
                '\n' +
                '6.8. De Gebruiker verliest zijn recht op het verkrijgen van Credits indien deze zijn Aankoop retourneert of indien de overeenkomst die ten grondslag ligt aan de Aankoop waarmee de Credits zijn verdiend anderszins wordt beëindigd.\n' +
                '\n' +
                '6.9. Voor het uitkeren van Credits is Affiliate Marketing Group BV afhankelijk van de vergoeding die een Partner terzake uitkeert. Indien een Partner, om welke reden dan ook, niet aan zijn uitkeringsverplichting voldoet, schort dat de verplichting van Affiliate Marketing Group BV om Credits uit te keren op. Affiliate Marketing Group BV zal zich in een dergelijk geval naar beste kunnen inspannen om de vergoeding van de Partner zo snel mogelijk te verkrijgen om de Credits zo spoedig mogelijk daarna uit te keren.\n' +
                '\n' +
                '6.10. Alle kortingspercentages en aanbiedingen die op de Website staan vermeld zijn onder voorbehoud en kunnen op ieder moment door Affiliate Marketing Group BV worden aangepast of verwijderd. Affiliate Marketing Group BV kan niet garanderen dat een korting daadwerkelijk door een Partner wordt geaccepteerd en/of in combinatie met een andere aanbieding kan worden gebruikt.\n' +
                '\n' +
                '6.11. Op iedere korting en/of aanbiedingen kunnen specifieke voorwaarden van toepassing zijn, welke voorwaarden per Partner dienen te worden geraadpleegd.'}
            </Text>
            <Text style={styles.header}>Artikel 7. Uitkering</Text>
            <Text style={styles.text}>
              {'7.1. De Gebruiker heeft slechts recht op uitkering van het nominale bedrag dat door het vergaarde aantal Credits wordt vertegenwoordigd op het moment dat:\n' +
                'a. het door Gebruiker aantal vergaarde Credits een waarde van minimaal €1,- vertegenwoordigt;\n' +
                'b. de Gebruiker via het Profiel een betalingsverzoek heeft ingediend;\n' +
                'c. de Gebruiker geldige persoons-, adres- en rekeninggegevens heeft ingevoerd.\n' +
                '\n' +
                '7.2. Affiliate Marketing Group BV streeft ernaar een in het vorige lid bedoeld betalingsverzoek binnen 28 dagen af te handelen. Affiliate Marketing Group BV kan echter niet garanderen dat deze termijn daadwerkelijk zal worden gehaald, noch aanvaardt zij enige aansprakelijkheid voor schade die is veroorzaakt door het overschrijden van deze termijn.\n' +
                '\n' +
                '7.3. Indien het aantal Credits van Gebruiker een waarde van €150,- vertegenwoordigt, zal dit bedrag automatisch worden uitgekeerd. Dientengevolge is Gebruiker niet in staat meer Credits te verzamelen indien het totaal aantal door Gebruiker verzamelde Credits reeds €150,- bedraagt.\n' +
                '\n' +
                '7.4. Credits worden geconverteerd naar Euro’s en worden overgemaakt naar een bankrekening die bij een Nederlandse bank geregistreerd is. Indien vergaarde Credits op basis van een vreemde valuta zijn gewaardeerd, wordt de nominale waarde van deze Credits in Euro’s bepaald door de actuele wisselkoers, zoals bepaald door Affiliate Marketing Group BV of een door Affiliate Marketing Group BV aan te wijzen derde.\n' +
                '\n' +
                '7.5. Een betalingsverzoek kan slechts strekken ter uitkering van het volledige aantal door Gebruiker vergaarde Credits.\n' +
                '\n' +
                '7.6. Affiliate Marketing Group BV aanvaardt geen enkele aansprakelijkheid voor schade ontstaan door het invoeren van foutieve of incomplete (betalings)gegevens door Gebruiker.\n' +
                '\n' +
                '7.7. Affiliate Marketing Group BV is gerechtigd om tot ten hoogste 10% van het aan Gebruiker uit te keren bedrag in te houden om eventuele administratiekosten te dekken.\n' +
                '\n' +
                '8.1. De Intellectuele Eigendomsrechten met betrekking tot de Dienst, waaronder in ieder geval de Website, alsmede die via de Website toegankelijk gemaakte informatie zoals de teksten, look-and-feel, templates van de Profielen en overige webpagina’s, video-, audio- en beeld- of fotomateriaal, berusten bij Affiliate Marketing Group BV en/of haar licentiegevers.\n' +
                '\n' +
                '8.2. Onder de voorwaarden die in deze Gebruiksvoorwaarden zijn gesteld, geeft Affiliate Marketing Group BV de Gebruiker een beperkt, persoonlijk, herroepelijk, niet-exclusief, niet sub-licentieerbaar en niet-overdraagbaar recht op toegang tot en gebruik van de Dienst, de Content en de Website, voor de doeleinden als beschreven in deze Gebruiksvoorwaarden.\n' +
                '\n' +
                '8.3. De Gebruiker behoudt in beginsel de Intellectuele Eigendomsrechten met betrekking tot de geplaatste Content. De Gebruiker erkent en stemt ermee in dat hij door het beschikbaar stellen/uploaden van Content automatisch aan Affiliate Marketing Group BV een kosteloze, wereldwijde, onherroepelijke, sub-licentieerbare en overdraagbare licentie verstrekt om\n' +
                '(i)de Content te gebruiken, te verveelvoudigen, te verspreiden en openbaar te maken in verband met de Dienst; en\n' +
                '(ii)de Content te gebruiken en verveelvoudigen (en aan derden toe te staan om te gebruiken en verveelvoudigen) in welke media dan ook voor marketing en/of promotie doeleinden in verband met de Dienst.\n' +
                '\n' +
                '8.4.De Gebruiker doet uitdrukkelijk afstand van alle persoonlijkheidsrechten genoemd in artikel 25 van de Auteurswet, voor zover dit krachtens dat wetsartikel is toegestaan.\n' +
                '\n' +
                '8.5.De Gebruiker staat er jegens Affiliate Marketing Group BV voor in dat hij volledig rechthebbende is ten aanzien van de Content en dat hij volledig gerechtigd is om de licentie als bedoeld in dit artikel te verlenen aan Affiliate Marketing Group BV.\n' +
                '\n' +
                '8.6. Het is de Gebruiker uitdrukkelijk niet toegestaan om enige informatie die via de Dienst of de Website toegankelijk wordt gemaakt, waaronder mede begrepen Content van andere Gebruikers, te downloaden, te kopiëren, te wijzigen, te reverse engineren, openbaar te maken of voor enig ander doeleinde te gebruiken dan de in deze Gebruiksvoorwaarden genoemde doeleinden, tenzij Affiliate Marketing Group BV of de betreffende rechthebbende daar toestemming voor heeft gegeven dan wel dwingend Nederlands recht zulk gebruik toestaat.\n' +
                '\n' +
                '8.7. Niets in deze Gebruiksvoorwaarden is bedoeld om enig Intellectueel Eigendomsrecht aan Gebruiker over te dragen. Gebruiker zal geen handelingen verrichten die inbreuk kunnen maken op de Intellectuele Eigendomsrechten van Affiliate Marketing Group BV zoals het registreren van domeinnamen, merken of Google AdWords die lijken op of identiek zijn aan enig object waarop Affiliate Marketing Group BV Intellectuele Eigendomsrechten heeft, of het opvragen of hergebruiken van substantiële delen of het herhaald en systematisch opvragen of hergebruiken van niet-substantiële delen van de Website.'}
            </Text>
            <Text style={styles.header}>Artikel 9. Privacy</Text>
            <Text style={styles.text}>
              {
                '9.1. Affiliate Marketing Group BV verwerkt de contactgegevens (e-mailadres en geboortedatum) die nodig zijn voor het beheer van de onze gebruikers. Daarnaast worden gebruiksgegevens (IP-adres, bezochte pagina’s, bezoekduur, locatie (stad, land, taal), browser (Internet Explorer of Google Chrome) en klikgedrag gebruikt om jouw cashback te registreren. Daarnaast voor statische doeleinden ten behoeve van de verbetering van ons cashback platform. De persoonsgegevens van de gebruiker zijn opgenomen in ons bestand en zullen vertrouwelijk en conform de Algemene Verordening Gegevensbescherming behandeld worden. Meer informatie over het privacy-beleid van Affiliate Marketing Group BV kan gevonden worden op de '
              }
              <Url
                text="privacy pagina"
                url="https://raboom.nl/privacy-policy"
              />
              .
              {'\n\n9.2. De transactiedetails slaan we op om jouw cashbacks uit te kunnen keren, je opgespaarde tegoed te kunnen tonen en je te helpen bij het claimen van mislukte transacties. Deze data bewaren wij voor onze boekhouding zeven jaar. De transactiedetails worden geanonimiseerd wanneer je je account bij ons laat verwijderen.\n' +
                'Voor het beheren van jouw account verwerken we ook transactiedetails zoals het aankoopbedrag excl. BTW, transactiedatum en –tijd en de webshop waar je je aankoop hebt gedaan.\n' +
                '\n' +
                '9.3. Het lid heeft onder meer het recht op inzage van zijn persoonsgegevens, mits zijn identiteit kan worden vastgesteld, evenals het recht op verwijdering van zijn persoonsgegevens, mits deze niet noodzakelijk zijn voor het uitvoeren van de Overeenkomst. Tevens beschikt het lid over het recht om verbeteringen in zijn gegevens aan te laten brengen indien deze foutief zijn.\n' +
                '\n' +
                '9.4. Persoonsgegevens van het lid worden gedeeld met Rabobank ten behoeve van de uitbetaling van de cashback van onze gebruikers.\n' +
                '\n' +
                '9.5. Telefoongesprekken met een lid kunnen door Affiliate Marketing Group BV worden opgenomen voor trainings- en beoordelingsdoeleinden.'}
            </Text>
            <Text style={styles.header}>
              Artikel 10. Garanties en vrijwaringen
            </Text>
            <Text style={styles.text}>
              {'10.1. De Gebruiker is jegens Affiliate Marketing Group BV aansprakelijk voor, en vrijwaart Affiliate Marketing Group BV volledig tegen, alle schade en kosten die Affiliate Marketing Group BV lijdt of maakt ten gevolge van (i) een toerekenbare tekortkoming in de nakoming van een overeenkomst met Affiliate Marketing Group BV door de Gebruiker, (ii) enig handelen van de Gebruiker bij het gebruik van de Dienst of (iii) van een onrechtmatige daad. Alle door Affiliate Marketing Group BV gemaakte kosten en geleden schade die op enige wijze verband houdt met dergelijke aanspraken zullen door de Gebruiker worden vergoed.\n' +
                '\n' +
                '10.2. De Gebruiker staat er jegens Affiliate Marketing Group BV voor in dat de informatie die hij bij het aanmaken van zijn Profiel en het plaatsen van Content verstrekt compleet, actueel en juist is. De Gebruiker erkent en begrijpt dat de correctheid, actualiteit en volledigheid van de verstrekte Content van groot belang is voor de optimale werking van de Dienst.\n' +
                '\n' +
                '10.3. De Gebruiker is zelf volledig verantwoordelijk voor het voldoen aan de (fiscale) verplichtingen die voortvloeien uit het vergaren en laten uitbetalen van Credits en vrijwaart Affiliate Marketing Group BV voor alle vorderingen van derden – waar onder begrepen de Belastingdienst – ter zake.\n' +
                '\n' +
                '10.4. De Gebruiker staat er jegens Affiliate Marketing Group BV voor in dat hij gerechtigd is om van de Dienst gebruik te maken en dat hij zal handelen in overeenstemming met deze Gebruiksvoorwaarden.'}
            </Text>
            <Text style={styles.header}>Artikel 11. Aansprakelijkheid</Text>
            <Text style={styles.text}>
              {'11.1. Affiliate Marketing Group BV aanvaardt geen enkele aansprakelijkheid voor schade ten gevolge van het verlenen van de Dienst dan wel uit onrechtmatige daad of anderszins, voor zover dit op grond van dwingend recht is toegestaan.\n' +
                '\n' +
                '11.2. Indien Affiliate Marketing Group BV aansprakelijk is jegens Gebruiker voor schade uit welke hoofde dan ook, is Affiliate Marketing Group BV uitsluitend aansprakelijk voor directe schade die Gebruiker lijdt als gevolg van een aan Affiliate Marketing Group BV toerekenbare tekortkoming en/of onrechtmatige daad. De totale aansprakelijkheid onder de overeenkomst zal nooit meer dan €250,- bedragen.\n' +
                '\n' +
                '11.3. Onder directe schade wordt uitsluitend verstaan:\n' +
                'a. materiële schade aan zaken;\n' +
                'b. redelijke kosten gemaakt ter voorkoming of beperking van directe schade, die als gevolg van de gebeurtenis waarop de aansprakelijkheid berust mochten worden verwacht;\n' +
                'c. redelijke kosten gemaakt ter vaststelling van de schadeoorzaak.\n' +
                '\n' +
                '11.4. Iedere aansprakelijkheid van Affiliate Marketing Group BV voor andere dan directe schade, zoals beschreven in art. 11.3, waaronder in ieder geval begrepen gevolgschade, is uitgesloten. Onder gevolgschade wordt onder meer begrepen, winstderving, gemiste besparingen, verminderde goodwill, reputatieschade, schade door bedrijfsstagnatie, verliezen, kosten gemaakt ter voorkoming of vaststelling van gevolgschade, vermissing, verwisseling of beschadiging van elektronische gegevens en/of schade door vertraging in de transport van het dataverkeer.\n' +
                '\n' +
                '11.5. De in dit artikel opgenomen beperking van aansprakelijkheid is niet van toepassing in geval van opzet of bewuste roekeloosheid van Affiliate Marketing Group BV zelf of haar leidinggevenden.\n' +
                '\n' +
                '11.6. De aansprakelijkheid van Affiliate Marketing Group BV wegens toerekenbare tekortkoming in de nakoming van een overeenkomst ontstaat in alle gevallen slechts indien Gebruiker Affiliate Marketing Group BV onverwijld en deugdelijk schriftelijk in gebreke stelt, waarbij een redelijke termijn van tenminste twee weken ter zuivering van de toerekenbare tekortkoming wordt gesteld, en Affiliate Marketing Group BV ook na die termijn toerekenbaar te kort blijft schieten in de nakoming van haar verplichtingen, behoudens in geval van een blijvende toerekenbare tekortkoming. De ingebrekestelling dient een zo volledig en gedetailleerd mogelijke omschrijving van de tekortkoming te bevatten, zodat Affiliate Marketing Group BV in staat is adequaat te reageren.\n' +
                '\n' +
                '11.7. Voorwaarde voor het ontstaan van enig recht op schadevergoeding is steeds dat de Gebruiker de schade zo spoedig mogelijk na het ontstaan daarvan schriftelijk bij Affiliate Marketing Group BV meldt. Iedere vordering tot schadevergoeding tegen Affiliate Marketing Group BV vervalt door het enkele verloop van 12 maanden na het ontstaan van de vordering.'}
            </Text>
            <Text style={styles.header}>Artikel 12. Overmacht</Text>
            <Text style={styles.text}>
              {'12.1. Er is geen sprake van een toerekenbare tekortkoming in de nakoming van de overeenkomst door Affiliate Marketing Group BV indien sprake is van overmacht.\n' +
                '\n' +
                '12.2. Onder overmacht wordt onder meer begrepen ziekte van werknemers en/of afwezigheid van voor het aanbieden van Affiliate Marketing Group BV cruciale medewerkers, onderbrekingen van de toelevering van elektriciteit, stakingen, oproer, overheidsmaatregelen, brand, natuurrampen, overstromingen, tekortkomingen van toeleveranciers van Affiliate Marketing Group BV, tekortkomingen van door Affiliate Marketing Group BV ingeschakelde derden, storingen in de verbinding met internet, de niet-beschikbaarheid van diensten van derden, hardware-storingen, storingen in (telecommunicatie)netwerken en andere onvoorziene omstandigheden.\n'}
            </Text>
            <Text style={styles.header}>Artikel 13. Duur en beëindiging</Text>
            <Text style={styles.text}>
              {'13.1. De Gebruiker heeft het recht om op elk gewenst moment het gebruik van de Dienst te staken en het Profiel te verwijderen.\n' +
                '\n' +
                '13.2. Als je niet je Profiel bezoekt, waarbij je ‘inlogt’ met je persoonlijke gebruikersnaam en wachtwoord, voor een aaneengesloten periode van 12 maanden, dan zal na de 365e dag (de ‘Afwezige Periode’) je Profiel als ‘Inactief’ worden geregistreerd. Zodra je Profiel als ‘Inactief’ is geregistreerd, houdt Affiliate Marketing Group BV zich het recht voor administratiekosten (de ‘Inactieve Profiel Kosten’) van 5 EUR maandelijks in rekening te brengen (of omgerekend naar de op dat moment geldende koers van EUR naar GBP, USD, of ZAR). Affiliate Marketing Group BV trekt dit bedrag maandelijks van je Saldo af zolang je als ‘Inactief’ geregistreerd bent en er nog een positief Saldo op je Profiel staat. Het is mogelijk je profiel te her-activeren door in te loggen op je Profiel. De maandelijkse afschrijving van de ‘Inactieve Profiel Kosten’ stopt vervolgens automatisch.\n' +
                '\n' +
                '13.3. Voor de beëindiging (aanvraag verwijderen gegevens) van het Profiel van Gebruiker, om welke reden dan ook, zal de Gebruiker de Credits zelf moeten laten uitbetalen. Indien Gebruiker één (1) maand na de aanvraag van het verwijderen van de gegevens de Credits niet heeft uitgekeerd is Affiliate Marketing Group BV gerechtigd om de Credits af te schrijven.\n' +
                '\n' +
                '13.4. Bij beëindiging van de overeenkomst, om welke reden dan ook, vervalt per direct het recht van de Gebruiker om de Dienst te gebruiken en wordt de toegang tot de Dienst direct ontzegd. Affiliate Marketing Group BV verwijdert bij beëindiging, om welke reden dan ook, onmiddellijk het Profiel. Affiliate Marketing Group BV blijft gerechtigd om alle Content die de Gebruiker op de Website heeft geplaatst te gebruiken zoals bepaald in artikel 8.3. Na het einde van de overeenkomst zal Affiliate Marketing Group BV echter op het eerste verzoek van de Gebruiker alle Content die de Gebruiker op de Website heeft geplaatst verwijderen of anonimiseren. Affiliate Marketing Group BV is niet gehouden om na beëindiging van de overeenkomst, enige Content aan de Gebruiker te verstrekken en/of te converteren.'}
            </Text>
            <Text style={styles.header}>Artikel 14. Varia</Text>
            <Text style={styles.text}>
              {'14.1. Op deze Gebruiksvoorwaarden en al het gebruik van de Dienst en de Website is Nederlands recht van toepassing. De toepassing van het Weens Koopverdrag (CISG) wordt nadrukkelijk uitgesloten.\n' +
                '\n' +
                '14.2. Alle geschillen die tussen de Gebruiker en Affiliate Marketing Group BV ontstaan, zullen worden voorgelegd aan de bevoegde rechter in het arrondissement van Amsterdam tenzij dwingend recht bepaalt dat het geschil aan een andere rechter moet worden voorgelegd.\n' +
                '\n' +
                '14.3. Affiliate Marketing Group BV mag rechten en verplichtingen die uit deze Gebruiksvoorwaarden voortvloeien overdragen aan derden en zal de Gebruiker daarvan op de hoogte stellen. Indien de Gebruiker deze overdracht van verplichtingen aan een derde niet acceptabel vindt, kan de Gebruiker het gebruik van de Dienst staken en zijn Profiel (laten) beëindigen.\n' +
                '\n' +
                '14.4. Is of worden deze Gebruiksvoorwaarden gedeeltelijk ongeldig, dan blijven de Gebruiker en Affiliate Marketing Group BV aan het overblijvende gedeelte verbonden. Affiliate Marketing Group BV zal het ongeldige gedeelte vervangen door bedingen die wel geldig zijn en waarvan de rechtsgevolgen, gelet op de inhoud en de strekking van deze Gebruiksvoorwaarden, zoveel mogelijk overeenstemmen met die van het ongeldige gedeelte.\n' +
                '\n' +
                'Deze voorwaarden zijn voor het laatst aangepast op 29 april 2020.'}
            </Text>
          </ScrollView>
          <LinearGradient
            colors={[white, '#ffffff00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradient}
          />
        </View>
        <CommonButton
          onPress={() => {
            dispatch(
              setFullResponse({
                access_token: access_token,
                token_type: token_type,
                expires_in: expires_in,
                spoil_token: spoil_token,
                refresh_token: refresh_token,
              }),
            );
          }}
          text="Ik ga akkoord"
          styleContainer={{marginTop: calcHeight(10)}}
        />
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
  },
  text: {
    color: '#2D495A',
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
  },
  header: {
    color: '#2D495A',
    fontFamily: FONTS.Poppins.SemiBold600,
    marginTop: calcWidth(15),
    marginBottom: calcWidth(3),
    fontSize: calcFontSize(16),
  },
  iconCrossGradient: {
    width: calcWidth(18),
    height: calcWidth(18),
  },
  linearGradient: {
    position: 'absolute',
    height: calcHeight(40),
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: calcWidth(5),
  },
});
export default PopOver;
