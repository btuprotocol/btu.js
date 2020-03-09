/******************************************************************************/
/*                                                                            */
/*                            BTU DAPPBAR JS 2019                             */
/*                        Antoine Casse - BTU Protocol                        */
/*                         Rena Colas - BTU Protocol                          */
/*                                                                            */
/******************************************************************************/

// Protection contre les conflits de version jQuery ; initialisée plus tard
var jQuery_btu

/**
 * Configuration
 */
const _btu_config = {
  supportedLanguages: ['en', 'fr'],
  defaultLanguage: 'en',
  currentLanguage: null,
  placeholderTag: 'btu-placeholder',
  walletinput: sessionStorage.getItem("BTU-InputWallet"),
  defaultWallet: '0xd00551b9d6CB3C4dDfc36df874c642b19D2b9e22',
  currentModalType: 'create',
  page: 1,
  walletConnectUrl: 'https://wallet-connect.btu-direct.com/',
}

/**
 * Traduction français | anglais
 */
const _btu_translations = {
  "en": {
    "connected": "Connected",
    "notConnected": "Connect Wallet",
    "connectionRequired": "Connection required",
    "usingBTU": {
      "using": "To use this service, please provide us with your BTU address",
      "usingMobile": "Connect or download your wallet",
      "choiceConnected": "Provide your BTU address OR create one in a few clicks.",
      "usingConnected": "In order to use this service, please connect to your wallet, BTU Direct for example",
      "createWallet": "Create a BTU wallet",
      "downloadApp": "Download our free app",
      "btuDirect": "BTU Direct",
      "trustWallet": "Trust Wallet",
      "walletConnect": "Wallet Connect",
      "hasWallet": "I already have a  BTU wallet",
      "hasWalletMobile": "Enter your wallet address",
      "changeWallet": "Change wallet",
      "connection": "Connection"
    },
    "isConnected": {
      "nowCo": "You are connected with the following BTU address",
      "BTUAddr": "Your BTU address :",
      "switchWallet": "Change wallet"
    },
    "isDownload": {
    "other": "OR",
    "download": "Download BTU Direct",
    "download_bis": "to get your BTU address",
    },
    "inputWallet": {
      "howTo": "Please enter your BTU address below",
      "walletConnect": "Scan the QR code with a Wallet Connect-compatible wallet",
      "inputCo": "Connection",
      "addrBTU": "BTU address",
      "placeholder": "0x...",
      "requiredETH": "Required",
      "invalidETH": "Invalid BTU address"
    },
    "isCreated": {
      "afterCreate": "After creating your wallet, you will have access to all our services.",
      "hasCreated": "I have created my wallet",
      "hasWallet": "I already have a wallet"
    },
    "invalidAddress": "Invalid address",
    "nonEthereumBrowser": "Non-Ethereum browser detected. You should consider trying BTU Direct!",
    "placeholderMissing": "Please integrate a <div id='btu-placeholder'> tag in order to use the BTU Dappbar",
  },
  "fr": {
    "connected": "Connecté",
    "notConnected": "Non connecté",
    "connectionRequired": "Connexion requise",
    "usingBTU": {
      "using": "Pour utiliser ce service, vous devez nous fournir une adresse BTU",
      "usingMobile": "Pour utiliser ce service, vous devez nous fournir une adresse BTU",
      "choiceConnected": "Utilisez votre adresse BTU ou créez-en une en quelques clics si vous n’en avez pas.",
      "usingConnected": "Pour utiliser ce service, veuillez vous connecter à un portefeuille, BTU Direct par exemple",
      "createWallet": "Je crée une adresse BTU",
      "downloadApp": "Téléchargez notre app gratuite",
      "btuDirect": "BTU Direct",
      "trustWallet": "Trust Wallet",
      "walletConnect": "Wallet Connect",
      "hasWallet": "J’ai une adresse BTU",
      "hasWalletMobile": "J’ai une adresse BTU",
      "changeWallet": "Changer de portefeuille",
      "connection": "Connexion"
    },
    "isConnected": {
      "nowCo": "Vous êtes connecté à votre portefeuille",
      "BTUAddr": "Votre adresse BTU :",
      "switchWallet": "Changer de portefeuille"
    },
    "isDownload": {
      "download": "Télécharger BTU Direct",
      "download_bis": "pour obtenir votre adresse BTU",
      "other": "OU"
    },
    "inputWallet": {
      "howTo": "Veuillez renseigner votre adresse",
      "walletConnect": "Scannez le QR code avec un portefeuille compatible Wallet Connect",
      "inputCo": "Connexion",
      "addrBTU": "Adresse BTU",
      "placeholder": "0x...",
      "requiredETH": "Adresse BTU requise",
      "invalidETH": "Adresse BTU invalide"
    },
    "isCreated": {
      "afterCreate": "Après création de votre portefeuille, vous aurez accès à l'intégralité de nos services et vous pourrez gagner des BTU à chaque réservation.",
      "hasCreated": "J'ai créé mon portefeuille",
      "hasWallet": "J'ai déjà un portefeuille"
    },
    "invalidAddress": "Adresse invalide",
    "nonEthereumBrowser": "Votre navigateur n'utilise pas Ethereum. Vous devriez essayer BTU Direct!",
    "placeholderMissing": "Veuillez intégrer une balise <div id='btu-placeholder'> pour utiliser la Dappbar BTU",
  }
}

/**
 * Icônes
 */

const _btu_icons = {
  qrcode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAEIAQMAAACZOPi8AAAABlBMVEUAAAD///+l2Z/dAAAAAWJLR0QB/wIt3gAAAORJREFUaN7tmcEOwzAIQ/3/P+0dCsZZV03q1URq1NJ3sgImCfhvYIkllljimcA1SII1KxJJlDT1HxNJJQAcnEWCiZ65xPUN0yyaaK5Ky3POZRCKWz79rMkZxLhvZdOzZ0cQpdekFWRHkQQllNQCGUywFJOAXXBiicONzmTKI7ratgWNgpmEmpN5v1WYLAL9yJxxZlQYMZWmSy9w2w4mEepfzaHJVIL0hXQZEHIJ+L4G1tOnElpGMMUYTMiTZ7f3pVgk4f0slyhfJny3E0no5MzaFOYSsDMBnncUicTezy2xxBIviA9nicl6Yc/fjQAAAABJRU5ErkJggg==',
	arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAdUlEQVQ4je2Tuw2AMAxEbcQCbMEi/ETFNFBQUDIimxDRPBoiISGDkrRc63v+nGSRFwEjML95vmAAB5Sh8HLBO1ClwHUK3MTCDmhT4C4U9mlHKRORImiiscV6O6GPbeJzOIDhb/II1nym3Cqo6gQ4EUFVN8t3Apiw/NlVkDkiAAAAAElFTkSuQmCC',
	walletProviders: {
	  metamask: 'data:image/png;base64,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',
	  alpha: 'data:image/png;base64,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',
	  coinbase: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcJCTUVUxFNxAAAAPNJREFUKM9jFAv6wEAKYGIgEZCsgQVT6O8/hu8////7z8DGwsjBRoQNfZmcbzfwf98ucHwKj4Um8///uDX8+ctwdgZvnBvb//8Mt5781ZJnrovj+PUHt5Oy/dlkRJk2HP0d0/qVkYlBT4n5xqN/7Kw4NPz6zeBqwsrAwJA76Rs3JyMDA8Odp/9YmKkYrGysDLvP/GZgYJicx/X1+/9vP/+rSDP9+YuugRE5pv/8Zbg4m1dGlOn7z/+PX/9Tk2E+e+uPc8lXZG+gOImFmcE44/OiXb8YGRnUZJivPfzbuOgHGwtuG4iJOCwxzczEwMPJOHCJDwCmyVi8+Q+LkAAAAABJRU5ErkJggg==',
	  opera: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHeSURBVDiNhZM/aFNRFMZ/575QWzrYQVzEwSWCij4IeSmIKE1BUBDt0KHg4OzgPxQHRQRRB8GhWBBBcBBRBFFcRLo4aYjte5jFgoNKHSwUaX0kxPfucUjyclNS8k333Hu+73znco6oKi7WJ0t5EWZEKQAFwIAsqPI5Z5JHw++rP9x8yQREJJ4onUP0NjACYFW/xI109W9TtyWpjg3l5Fdq9eka3lyhWv0HkMvIk8FbVI91lFNldnml8VKNaViRk6heSZq6AyhuITkMTGUO4vL4eUTvZ75UL4/OV+65Vmu+PwU87xQVkbN7FxfnZK0c5A2EHdtAOHqoUuCGWjag5vuPgTPtsGFVfSPCjENGRW71IwOkcNcJh40xJ0z7tzN4xlb6kQEOhOES8NtptWSgR+DPyLvKz80E2lhyzuNmQPJAGGDBicfqR4OdAzh55/zRKOIKkFoTbMaMfD8PbM8uRD6ZVJMnQD27U73GTenbmgdXnbBhrX1jts5Xv4Fedx78+EPx4kZye5BOd4vLpf1R9LW1C9PTXrz6/TVwPGtFmV1eqfeMcssEAK/2hWF3lDuScTm4ANwBhqD/Mlm1z5q7kgd7XtSavQJtrE8UdxtPTqFyROCgQowQoUSJpg9bLXfxHzln1t9Wx+3hAAAAAElFTkSuQmCC',
	  go: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcJCTkmQHRj3gAAApFJREFUOMtFk0lsTVEYx3/fHd5tX3mkJKSmGooQkejGGCs0Nlja2RhWEiERiSkSBMGCEiwMG4mFjWAjpGqImEU0QoPW9JQ2aW/bd+9753wW9/DO5ozf8D/f7xN7YXI3fs0EjXu2tXX0tS6dwbSglk1iaNEBpgOKxweEm2nI+fZOvq5opQIIgOjVxUpYB6JWu+6cEI8dhGSjBJoAnnseApaDAzHHR+2jDxCxrfUHxDd7NE1ek5bmSw7wAQUqoBbEd2cWtATAtf4SW0bvpc9f2zx8f3xNUhBTWUsZREArmTGVbE9QdYABfOZGEemyJtolOcjcMOCteKApSM5F8oAUxLrUc06GdfdAUqYRc9Q/ba+vU+3vVh0sqg73qHZcVntqpOq3B6rWqJpEtVJSfXpY9WyDavGV2hvr1Rz1DwQSRKuleSvERXhxCsTAUBcydiY0LIG2nfDjASw7BPM2w/srkB+D5OrA6moPq42EtVB8Br9eQjQCCrPRaBKUB9HPbfDxEfS+A2syLdaALYOnMzzUaROFQGHyclh5DilMAWsQsZn+fw/jAfj9Dvq/IJESgHRhSlNoWAg9z8EkGQOSQlSA+ethYhM0LALPA4Yg/g45DwLp9NQkt3l+EsI8NG+H+jnw5Qb8eQIdF6FxDSzYD5KHx7shtFBXD9SiqXdb0kPMCyPeZFEdgb6jr+zqjiMyzMqsMUgEiTLNa/9FhypnsA4e4+SWnaOoOksAOpz9o4YcfviTbgGIdzIuX8clhBbCLFuNq9lI6Gi0/3vjelxhY2EXvR4gI45QHCqzgRytEjqjfBVdTd1aQOFYbNhU2EUvjvR/yvXuZoKlTcwKatki0KKDTKWC4tGpcMvUcPbeKz6tulRt578VryYpd+FKrQAAAABJRU5ErkJggg==',
	  btu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMTSURBVHgBdVNbaFRnEJ6Z//yb9aSk25rEbc2uRtpKX2qolpbSy4NCxVJFWu0NJC3YtRGSVmjJU91CaG0J9JZiYh/64lOLxsQrKEZ8UBFRolFE0PWSmNVcTNZszu4555/xXzUiwczLPz9z/Wa+QZgmG3dcf4fL1AoBXkOCSgA0gEyW+7ClOhfu/f6L2uzj/jilpNM9Tva1hb8i8Efa54MVhbCr5dMF3SVbw85rb0HE2f78bb9JGeovu0sXNm1KeCWb8yA4TUOLXzgYCUyhctx8rMMwbgv3TSWPIPcVUe5cr3aWuQUoyGzxN3Rm/mlfXXv1fgcb9g9sphDmxm/m/lKk4qHWlUZT9cQsWuJFoE6AqkTkCKKsZoGfLa7nhPD1+ED2TWrqGlgoDPW1d4a//SH18jlAxcPPOutvxdTvkxrz5T42zRv0Pktm/Z8I4Kzrm+6tKxMpEDk/HI+/7xQcaAbD7d+tW5T/pjMTGyTdGiKMkJFm6/jLFIyWtivzdCAZz1Fv2+/p2BhsVlKMYWpP/xmLw48GwXteRPfokE+0rUp+DU+Q9Xv767Xh5dWD6stIILMczTEikbhtbcgG9zpGjtYO8TaYQezEXxKihKOwijSWR7XOESB5wtJHDHOiBf4/QOaZEljcbzBKwjGeGAiCkYmJIlnCiIWwFoQ/mXCpfbxcJWbswKg2FeAxtxgbU2AmR5PuuwQCvSjStXVlchc4kc9tgj8adt1obtid/eDx4HSPOIy8GFAuNjbOzg09hTEmbrHw4c9QU13JqWP5nN6KnEmxwnpDYXdjZ//SdFpoS8flp/Wla1WGpI5EHS/55it0PSOdvE8ku4nDSvAAh/5/z+TJZSWxnOusQZIVglhGhvf5AKeUQ63gB6+SUI29l7+tvuohEzPzgfV2NDAXhUfnZ2GtG6Wx4Qx6o6+YBaGSpazURjssbSFfLcXoIv/W9mGy+9ExfdVxSieossb44oEtKYEUfmx8MTdVAI0+JEGwrMT/aat9INtSSwL7ZNL/ZqIjd0WKZeOP1ukWI4ZyalHrupr89M3cA/dcbhjLG+sSAAAAAElFTkSuQmCC',
	  enjin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABv0lEQVQ4jZWTz0tUURTHP+fN1ZR6Azriop07ocKSwF3NayOCQns3JcREq1m2i/6DcdcQ1PwJQUK0mfcWhihlaoHLWUxEWb6kl+N7/ninxXtvcGxC/W7uvYfz/Z7vuYcjnMDcdH1MoSQiDuhIEpWGqroC1RcLd9aP50t2uVd0+8SmIsgDUOukcJoeK/pcA8o1zwnbAin5jUCxO7ETCp4GTNU8J7QAkspnI6dVi2JTAZC56foYYq1mti/ahmvjgxSG+8jlpIO4H8WsLG7h/4gAidF43CiUJCUPFHp5Mn+T/n5Ds/GHKDpKLCvt82tzNxVQS6Fkkt9OcH1iCDvfS+XpBp8++Ke3IuKYZFSJVTvfA8DtyctM3BruSnpX/87m+q/0pSOmW9KOH9HaPewqsNfqjBuQBjAKEPw+AODzR5+15e1TWwBpGFV1RWQUYG1lm7uzBzx6fJVvX1qEe4ftD8zw9lWT1aWfSQOq7j9jvJTv4cqNAQYLF8gZC7EABVUlDGPeL26x4++TjVEA7s+4zwRKZ/DchkL15WvnoQWgAWUF7xxkTwPKABZAzXNCDZhSqILE/6dKrFDN9gCObWOG867zX3+ivrZ/cA+XAAAAAElFTkSuQmCC',
	  parity: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAFL+AABS/gGUsKC+AAAAB3RJTUUH4wcJCTMb4vPHRQAAAhlJREFUOMulk81KI0EUhb/bnR86kkhE4koijMZpcEBcCBE3voeP4dvMMj6H4saVLuIMJJHGPwKCi6hNQ9tV3X1nMemhx9HVXCiKqrrncopzDsxLVYt9U1W/q2qgqul8BfO7zXIvH4AH+kFdXFyUj4MypqKqiAiq+gPYKg8ejUaEYUie58RxjOd5AIequi0i31QVZw4elMFxHHNycoIxhjRNqdfrTCYToigqWrZUdSAiyPxf4+Ll/Pwcz/OIoojFxUVeXl5otVoYY2g2m/i+Xyb51QGOAB4fHzk7O6PZbDIcDqnVatzc3PD09IQxhqurK6IowlpbHnBUAQ5GoxHWWkSENE0Jw5DLy0tUFVVlOp0CICIEQcDGxgaVSgXgwAHWer0exhgA8jyn1+vheR77+/u4rsvu7i4rKyvUajVmsxkPDw8FgzUHwHVdlpaWcF2XarWKMYa9vT2m0yn9fh9rLe12mzzPybKM2WxGlmW/ZQTugC/dbpckSXh7eyMIAm5vb1FV7u/v/zQvLy8DUK1Wub6+xvf9Owc4LVisr6+TJAmNRoNOp0O328Vai+/7ZFlGvV5HVel0OoUap//IOB6PeX19pdFo8Pz8TLvdJgxDFhYWiOOYfr//l4wVEZmo6jFwCLC6ukqSJFhrcRyHPM9JkoSdnZ3CiUUdi8hEPrJyHMcMh0NEhFar9d48AD8LK38apncB+jRM/G+cfwFpdphMcZnr1QAAAABJRU5ErkJggg==',
	  trust: ' data:image/png;base64,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'
	}
}

/*******************************************************
 * Fonctions utiles
 *******************************************************/

/**
 * Récupère la langue active
 *
 * @returns {string} langue active
 */
const _btu_getLanguage = () => {
  if (_btu_config.currentLanguage === null) {
    _btu_initLanguage()
  }
  return _btu_config.currentLanguage	? _btu_config.currentLanguage : _btu_config.defaultLanguage
}

/**
 * Modifie la langue active
 *
 * @param {string} language - Code langue
 */
function _btu_setLanguage(language) {
  if (typeof language === 'string' && _btu_config.supportedLanguages.includes(language))
    _btu_config.currentLanguage = language
}

/**
 * Initialise la langue active
 */
const _btu_initLanguage = () => {
  if (_btu_config.currentLanguage === null) {
    const languageParam = _btu_getParameter('hl')
    if (languageParam === 'fr' || document.documentElement.lang === 'fr')
    _btu_setLanguage('fr')
  }
}

// Trouver un paramètre dans l'url
const _btu_getParameter = (parameterName) => {
	var result = null, tmp = []
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
			tmp = items[index].split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
	}
	return result;
}

// Afficher le wallet et le sauver dans le session storage
const _btu_inputWallet = (addr) => {
	if (addr && /^0[xX][0-9A-Fa-f]{40}$/.test(addr)) {
	  sessionStorage.setItem('BTU-walletAddr', addr)
	  sessionStorage.setItem("BTU-walletConnected", true)
	  jQuery_btu("#btu-conStatus").html(_btu_getWalletProvider() + " " + _btu_translate("connected"))
    jQuery_btu("#btu-walletSpan").html(addr.substring(0, 5) + '...' + addr.substring(38, 42))
	  jQuery_btu("#btu-statusLed > circle").css("color", "#0ca768")
    jQuery_btu("#btu-statusLed > circle").css("fill", "#0ca768")
    _btu_popupIsOpen = false
    jQuery_btu("#btu-modalOut").hide()
	}
}

// Traduction
const _btu_translate = (path) => {
	const language = _btu_getLanguage()
  const pathArr = path.split('.')
  if (pathArr.length > 0) {
    let text = _btu_translations[language][pathArr[0]]
    pathArr.slice(1).forEach(next => {
      if (text[next] !== undefined)
        text = text[next]
    })
    if (typeof text !== 'string')
      return ''
    return text
  } else {
    return ''
  }
}

// Navigateur courant
var _btu_userAgent = navigator.userAgent;

// Affiche le nom et le logo du provider du wallet, par example BTU direct
const _btu_getWalletProvider = () => {
	// Cherche si le user agent est Opera
	if (_btu_userAgent.indexOf("Opera") > -1 || _btu_userAgent.indexOf("OPR") > -1) {
			const provider_opera = [{name: "Opera", icon: 'opera'}]
			let final = ""
			provider_opera.forEach(elem => {
			final = elem.name
			if (elem.icon)
			  final = `<img id='btu-provider-img' alt="" src=${_btu_icons.walletProviders[elem.icon]}></img>` + final
			  }
			)
		if (final.length)
		  return final
		if (typeof window.__CIPHER__ !== 'undefined')
      return 'Cipher';
		if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
      return 'Infura';
		if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
      return 'Localhost';
		return '';
  }

  // Gestion Status
  if (window.ethereum && window.ethereum.isStatus) {
    return '<svg width="16" height="16" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.4762 0C10.0629 0 0 10.0737 0 22.5C0 34.9264 10.0629 45 22.4762 45C34.8895 45 44.9524 34.9264 44.9524 22.5C44.9524 10.0737 34.8895 0 22.4762 0Z" fill="#4360DF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.2309 21.5138C24.3595 21.6314 25.4882 21.749 26.8757 21.6716C30.6352 21.4618 32.9125 19.5302 32.7509 16.6428C32.5862 13.7052 29.5565 11.8953 26.5251 12.0645C21.5849 12.34 17.9521 16.6819 17.543 21.6444C18.2139 21.4871 18.9201 21.3932 19.586 21.356C20.9737 21.2787 22.1023 21.3962 23.2309 21.5138ZM13.5465 27.936C13.7024 30.6289 16.5727 32.288 19.4446 32.1328C24.1247 31.8802 27.5665 27.9002 27.954 23.3511C27.3184 23.4954 26.6495 23.5816 26.0185 23.6156C24.7039 23.6866 23.6346 23.5788 22.5653 23.471C21.4961 23.3632 20.4268 23.2554 19.1122 23.3264C15.5508 23.5187 13.3932 25.2893 13.5465 27.936Z" fill="white"/></svg> Status'
  }

  // Cherche si c'est un provider web3
	if (!window.web3) return '';
  // Cherche quel est le provider 
	const providers = [
	  {tag: "isMetaMask", compare: true, name: "Metamask", icon: 'metamask'},
	  {tag: "isTrust", compare: true, name: "Trust", icon: 'trust'},
	  {tag: "isGoWallet", compare: true, name: "GoWallet", icon: 'go'},
    {tag: "isAlphaWallet", compare: true, name: "BTU Direct", icon: 'btu'},
    {tag: "isBTUDirect", compare: true, name: "BTU Direct", icon: 'btu'},
	  {tag: "isToshi", compare: true, name: "Coinbase", icon: 'coinbase'},
	  {tag: "constructor.name", compare: "EthereumProvider", name: "Mist", icon: null},
	  {tag: "constructor.name", compare: "Web3FrameProvider", name: "Parity", icon: 'parity'}
	]
	let final = ""
	providers.forEach(elem => {
	  let tmp
	  if (elem.tag.indexOf(".") !== -1)
			tmp = window.web3.currentProvider[elem.tag.split(".")[0]][elem.tag.split(".")[1]]
	  else
			tmp = window.web3.currentProvider[elem.tag]
	  if (tmp === elem.compare) {
			final = elem.name
			if (elem.icon)
			  final = `<img id='btu-provider-img' alt="" src=${_btu_icons.walletProviders[elem.icon]}></img>` + final
	  }
  })

  if (final.length)
	  return final
	if (typeof window.__CIPHER__ !== 'undefined')
    return 'Cipher';
	if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
    return 'Infura';
	if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
    return 'Localhost';
	return '';
}

/**
 * HTML
 */

// Dapp bar
const _btu_templateDappbar = () => {
  return `
    <div id='btu-conStatus'><span class='btu-barButton'>${_btu_translate("connectionRequired")}<span></div>
    <div id='btu-openModal'>
      <span id='btu-walletSpan' class='btu-barButton'>${_btu_translate("notConnected")}</span>
      <svg id='btu-statusLed' focusable='false' viewBox='0 0 24 24' aria-hidden='true' role='presentation'>
        <circle id='btu-statusLedIn' cx='12' cy='12' r='10'></circle>
        <path fill='none' d='M0 0h24v24H0z'></path>
      </svg>
      <svg id='btu-modalBtn' focusable='false' viewBox='0 0 24 24' aria-hidden='true' role='presentation'>
        <path fill='none' d='M0 0h24v24H0z'></path>
        <path d='M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z'></path>
      </svg>
    <div>`;
}

// Base des popup
const _btu_templateModal = () => {
  return `
    <div id='btu-modalOut'>
      <svg>
        <defs>
          <clippath id="btu-modal-text-clip">
            <path d="M 0,0 400,0 500,105 C 400,105 400,90 300,90 C 200,90 200,105 100,105 C 0,105 0,90 -100,90 L 0,100 Z" />
          </clippath>
        </defs>
      </svg>
      <svg>
        <defs>
          <clippath id="btu-modal-text-back-clip">
            <path d="M 0,0 400,0 500,55 C 400,55 400,70 300,70 C 200,70 200,55 100,55 C 0,55 0,70 -100,70 L 0,50 Z" />
          </clippath>
        </defs>
      </svg>
      <div id='btu-modalIn'>
        <div id="btu-modal-close">
          <button id='btu-close'>×</button>
        </div>
        <div id="btu-modal-text-back"></div>
        <div id='btu-modal-text'></div>
        <div id='btu-modal-action'></div>
        <div id='btu-modal-footer'>
          <a href="https://btu-protocol.com/" target="_blank">
            Powered by BTU Protocol
          </a>
        </div>
      </div>
    </div>
  `;
}

const _btu_downloadSection = () => {
  if (_btu_getLanguage() === 'fr') {
    return `
      <div id="btu-btn-create" class="btu-btn-blue">
        <button id="btu-btn-create">
          ${_btu_translate("downloadApp")}
        </button>
      </div>
    `
  }

  return `
    <div id="btu-btn-create" class="btu-btn-blue">
      <button id="btu-btn-create">
        BTU Direct
      </button>
    </div>
    <div id="btu-btn-create" class="btu-btn-blue">
      <button id="btu-btn-create">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M17.493 7C21.335 9.948 25.741 9.766 27 9.766C26.725 26.532 24.627 24.299 17.493 29C10.360 24.299 8.275 26.532 8 9.7662C9.246 9.766 13.651 9.948 17.493 7Z" stroke="#ffffff" stroke-width="2.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Trust Wallet
      </button>
    </div>
  `
}

// Bloc non-connecté si mobile et français
_btu_createMobileFr = () => {
  return `
    <div id="btu-btn-create" class="btu-btn-blue">
      <button id="btu-btn-create">
        ${_btu_translate("usingBTU.downloadApp")}
      </button>
    </div>
    <div id="btu-btn-has-wrapper">
      <button id="btu-btn-has" class="btu-btn-link">
        ${_btu_translate("usingBTU.hasWallet")}
      </button>
    </div>
  `
}

// Bloc non-connecté si mobile et anglais
_btu_createMobileEn = () => {
  return `
    <div class="btu-create-list">
      <button id="btu-btn-create" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="24px" height="23px" viewBox="0 0 48 46" version="1.1">
            <path fill="#4B82ED" d="M18.3818,0.7637 C21.9810,-0.0989 25.7731,-0.0775 29.3789,0.7340 C29.4004,0.7653 29.4432,0.8263 29.4663,0.8577 C30.3224,2.0255 31.1521,3.2131 31.8878,4.4618 C32.5459,5.5472 33.1216,6.6771 33.6791,7.8169 C35.1637,7.7294 36.6548,7.6602 38.1426,7.7476 C39.2824,7.7773 40.4140,7.9125 41.5488,8.0164 L41.6824,8.0247 C43.0713,9.5686 44.2556,11.2907 45.2107,13.1331 C44.8164,14.3307 44.3826,15.5117 43.8828,16.6680 C43.0482,14.4577 41.8523,12.3975 40.3777,10.5534 C38.5187,10.3455 36.6432,10.3175 34.7744,10.3950 C35.6189,12.6268 36.2523,14.9344 36.6861,17.2816 C36.9072,18.6358 37.0952,19.9983 37.1744,21.3707 C37.0144,22.0701 37.7385,22.3637 37.9397,22.9459 C38.4428,24.0016 38.1096,25.3311 37.2239,26.0783 C37.2123,26.2169 37.1909,26.4907 37.1793,26.6276 C37.1397,27.2280 37.0952,27.8268 37.0193,28.4239 C36.9352,29.2404 36.8,30.0519 36.6680,30.8635 C36.2342,33.2437 35.5744,35.5793 34.7134,37.8408 C36.5476,37.9249 38.3835,37.8837 40.2111,37.7138 C41.8375,35.7624 43.1323,33.5307 43.9736,31.1307 C44.4206,29.9183 44.7059,28.6548 44.9352,27.3863 C45.5637,28.5839 46.1575,29.7979 46.6919,31.04 L46.7513,31.1719 C45.6527,34.6193 43.8020,37.8639 41.2734,40.4519 C38.7265,40.4684 36.1731,40.6284 33.6313,40.4041 C33.0193,41.5455 32.4453,42.7084 31.7723,43.8169 C30.5946,44.2754 29.3822,44.64 28.1451,44.8940 L27.8614,44.9567 C28.96,43.4078 29.9595,41.7880 30.8206,40.0956 C28.4981,39.7261 26.2037,39.1703 23.9851,38.3884 C22.7068,37.9364 21.4465,37.4268 20.2259,36.8395 C19.9686,36.7142 19.7113,36.5938 19.4540,36.4734 C18.7183,36.8016 17.8375,36.8280 17.1167,36.4453 C16.3101,36.0428 15.7591,35.2049 15.6832,34.3109 C15.5859,34.24 15.3913,34.0964 15.2940,34.0239 C14.0981,33.2470 12.9748,32.3645 11.8746,31.4573 C10.0651,29.9035 8.3892,28.1962 6.88,26.3505 C5.7880,28 4.8527,29.7468 4.0247,31.5414 C4.8643,33.8672 6.1905,35.9967 7.7723,37.8886 C9.7319,38.0569 11.7047,38.1030 13.6676,37.9694 C13.6841,38.0107 13.7171,38.0915 13.7319,38.1327 C14.0618,38.9426 14.4098,39.7443 14.7826,40.5360 C13.4630,40.6301 12.1435,40.7175 10.8206,40.6878 C9.4696,40.6696 8.1237,40.5723 6.7777,40.4437 C6.7018,40.4338 6.5501,40.4156 6.4742,40.4057 C3.3764,37.0837 1.2206,32.8808 0.4090,28.4057 C-0.1764,25.2420 -0.1336,21.9546 0.5723,18.8123 C1.4350,14.9096 3.3105,11.2412 5.9529,8.2457 C9.1909,4.5492 13.5950,1.8837 18.3818,0.7637 L18.3818,0.7637 Z M20.5080,3.0383 C19.2032,3.2626 17.9051,3.5694 16.6663,4.0445 C14.4428,4.8346 12.3810,6.0404 10.5303,7.4985 C9.4878,8.3760 8.4849,9.3113 7.6288,10.3752 C6.0750,12.2259 4.8098,14.3472 4.0032,16.6235 C4.8181,18.4511 5.7797,20.2144 6.8816,21.8870 C8.3562,20.0692 10.0156,18.4032 11.7657,16.8593 C12.8775,15.9901 13.9529,15.0597 15.1604,14.3257 L15.1587,14.2977 C15.3435,14.1756 15.5249,14.0486 15.7047,13.9167 C15.7080,13.3723 15.8432,12.8230 16.1550,12.3711 C16.8989,11.1967 18.6078,10.8404 19.7657,11.6057 C19.9620,11.5167 20.1583,11.4259 20.3562,11.3369 C21.5538,10.7447 22.8123,10.2927 24.0511,9.8012 C26.2828,9.0639 28.5756,8.5014 30.8948,8.1154 C30.0057,6.3802 29.0061,4.7010 27.8548,3.1257 C25.4334,2.6771 22.9410,2.6622 20.5080,3.0383 L20.5080,3.0383 Z M28.1253,11.3731 C26.8024,11.6931 25.4993,12.0940 24.2259,12.5707 L24.2787,12.5921 C23.1455,12.9006 22.0849,13.4713 21.0012,13.9331 C20.9105,14.6721 20.6020,15.4111 19.9983,15.8762 C19.2049,16.5426 18.0239,16.6432 17.1117,16.1632 C16.0280,16.8907 14.9525,17.6395 13.9694,18.5022 C12.8445,19.3913 11.8037,20.3859 10.8123,21.4202 C9.9859,22.2762 9.2206,23.1884 8.4816,24.1187 C9.2931,25.1414 10.1360,26.1410 11.0581,27.0663 L11.0531,27.0878 C12.0412,28.0610 13.0391,29.0292 14.1327,29.8853 C14.9971,30.6094 15.9158,31.2643 16.8445,31.8993 C17.6659,31.3550 18.7859,31.3187 19.6338,31.8235 C20.4964,32.3084 20.9863,33.2964 20.9567,34.2729 C22.0107,34.7711 23.0729,35.2527 24.1698,35.6470 C25.4630,36.1352 26.7876,36.5410 28.1303,36.8692 C29.3938,37.1826 30.6771,37.4070 31.9653,37.5917 C32.4684,36.3480 32.9204,35.0828 33.2767,33.7880 L33.2948,33.7797 C33.6544,32.4239 33.9744,31.0564 34.1888,29.6692 C34.3604,28.6152 34.4659,27.5529 34.5550,26.4874 C33.8721,26.1888 33.3030,25.6214 33.0606,24.9105 C32.5723,23.6288 33.2865,22.0898 34.5517,21.5901 C34.4692,20.5080 34.3620,19.4276 34.1789,18.3587 C33.9744,16.9731 33.6478,15.6090 33.2816,14.2597 C32.9204,13.0342 32.5063,11.8268 32.0346,10.6408 C30.72,10.8206 29.4119,11.0482 28.1253,11.3731 L28.1253,11.3731 Z M2.9459,20.4618 C2.5567,22.8783 2.5534,25.3525 2.9591,27.7674 C3.6387,26.5105 4.4057,25.3047 5.2008,24.1171 C4.3958,22.9311 3.6453,21.7121 2.9459,20.4618 Z"></path>
            <g fill="#4B82ED" opacity="0.2">
              <path d="M29.4663,0.8577 C29.7105,0.7637 29.9546,0.8973 30.1921,0.9468 C32.1781,1.5076 34.1344,2.2647 35.8861,3.3649 C35.2544,4.0725 34.3686,4.4767 33.6874,5.1315 C33.1035,4.8725 32.5459,4.4684 31.8878,4.4618 C31.1521,3.2131 30.3224,2.0255 29.4663,0.8577 Z"></path>
              <path d="M16.6663,4.0445 C17.9051,3.5694 19.2032,3.2626 20.5080,3.0383 C19.4210,4.6482 18.3290,6.2713 17.5076,8.0379 C19.4903,8.3562 21.4465,8.8296 23.3534,9.4614 C23.6024,9.5373 23.8317,9.6593 24.0511,9.8012 C22.8123,10.2927 21.5538,10.7447 20.3562,11.3369 C19.0416,10.9855 17.7022,10.7134 16.3513,10.5468 C15.8779,11.6931 15.4408,12.8626 15.1323,14.0635 L15.1587,14.2977 L15.1604,14.3257 C13.9529,15.0597 12.8775,15.9901 11.7657,16.8593 C12.0824,14.5913 12.8676,12.4255 13.5653,10.2564 C11.5859,10.1377 9.6016,10.1872 7.6288,10.3752 C8.4849,9.3113 9.4878,8.3760 10.5303,7.4985 C11.9175,7.5810 13.3113,7.5612 14.6985,7.6734 C15.3336,6.4527 15.9719,5.2338 16.6663,4.0445 Z"></path>
              <path d="M35.8861,3.3649 L35.9142,3.3319 C37.8457,4.4668 39.6189,5.8705 41.1694,7.4870 C41.3129,7.6486 41.4960,7.7954 41.5488,8.0164 C40.4140,7.9125 39.2824,7.7773 38.1426,7.7476 C37.5224,7.7410 37.0523,7.3220 36.5954,6.9591 C35.6849,6.2614 34.6853,5.6923 33.6874,5.1315 C34.3686,4.4767 35.2544,4.0725 35.8861,3.3649 Z"></path>
              <path d="M24.2259,12.5707 C25.4993,12.0940 26.8024,11.6931 28.1253,11.3731 C29.2964,11.9950 30.4775,12.6037 31.5909,13.3294 C30.9179,13.9942 30.0519,14.4082 29.3591,15.0515 C27.7426,14.0849 26.0222,13.3047 24.2787,12.5921 L24.2259,12.5707 Z M10.8123,21.4202 C11.8037,20.3859 12.8445,19.3913 13.9694,18.5022 C14.1162,18.9624 14.0057,19.4408 13.9480,19.9059 C13.5422,23.2214 13.6577,26.5847 14.1327,29.8853 C13.0391,29.0292 12.0412,28.0610 11.0531,27.0878 L11.0581,27.0663 C11.1785,26.7480 11.1257,26.4065 11.1158,26.0767 C11.0185,24.5080 11.0432,22.9344 11.1290,21.3641 C11.0498,21.3789 10.8915,21.4070 10.8123,21.4202 Z"></path>
              <path d="M43.8828,16.6680 C44.3826,15.5117 44.8164,14.3307 45.2107,13.1331 C46.4049,15.4045 47.1719,17.8969 47.5529,20.4321 C47.4837,20.7340 47.5628,21.1628 47.2296,21.3261 C46.5435,21.7715 45.9200,22.3274 45.1645,22.6556 C45.0919,22.0206 45.0688,21.3707 44.8742,20.7554 C44.3496,21.4268 44.0065,22.2169 43.5200,22.9129 C43.2857,23.3270 42.8668,23.7014 42.9212,24.2177 C42.5138,24.8445 41.8375,25.1760 41.2057,25.5274 C40.1237,26.3802 38.9426,27.1010 37.8903,27.9917 C37.6247,28.1797 37.3162,28.2936 37.0193,28.4239 C37.0952,27.8268 37.1397,27.2280 37.1793,26.6276 C38.1377,25.9331 38.8865,24.9632 39.5200,23.9752 C39.0301,23.2775 38.4049,22.6886 37.9068,21.9958 C38.5204,21.3723 39.4589,21.0952 39.8597,20.2738 C40.3249,20.7241 40.7191,21.2387 41.1265,21.7402 C42.2301,20.1583 43.0614,18.4082 43.8828,16.6680 Z M15.9307,36.4618 C16.1088,36.8577 16.2045,37.3047 16.4948,37.6379 C17.7567,37.4762 19.0152,37.2404 20.2259,36.8395 C21.4465,37.4268 22.7068,37.9364 23.9851,38.3884 C23.8301,38.5006 23.6635,38.5896 23.4837,38.6540 C21.5967,39.3105 19.6503,39.7839 17.6857,40.1468 C17.6560,40.7389 18.2119,41.1975 18.3769,41.7583 C17.6758,42.2482 16.8956,42.6325 16.3018,43.2626 C15.6964,42.4115 15.2857,41.4465 14.7826,40.5360 C14.4098,39.7443 14.0618,38.9426 13.7319,38.1327 C14.4164,37.5076 15.3319,37.1826 15.9307,36.4618 Z"></path>
              <path d="M31.5909,13.3294 C32.1797,13.5901 32.6284,14.1740 33.2816,14.2597 C33.6478,15.6090 33.9744,16.9731 34.1789,18.3587 C32.6152,17.1942 31.0482,16.0313 29.3591,15.0515 C30.0519,14.4082 30.9179,13.9942 31.5909,13.3294 Z"></path>
              <path d="M36.6861,17.2816 C36.9698,17.4053 37.2453,17.5571 37.4647,17.7814 C38.2861,18.5896 39.1224,19.3863 39.8597,20.2738 C39.4589,21.0952 38.5204,21.3723 37.9068,21.9958 C37.6907,21.7567 37.4367,21.5538 37.1744,21.3707 C37.0952,19.9983 36.9072,18.6358 36.6861,17.2816 Z"></path>
              <path d="M47.5529,20.4321 C47.9142,22.1096 47.8647,23.8647 47.7954,25.5785 C47.5777,27.4193 47.3682,29.3030 46.6919,31.0400 C46.1575,29.7979 45.5637,28.5839 44.9352,27.3863 C44.7059,28.6548 44.4206,29.9183 43.9736,31.1307 C43.3105,30.2284 42.9327,29.1612 42.3769,28.1962 C43.0564,27.6832 43.7822,27.2214 44.5261,26.8140 C44.6218,26.8800 44.8131,27.0119 44.9072,27.0779 C45.2338,25.6395 45.1595,24.1286 45.1645,22.6556 C45.9199,22.3274 46.5435,21.7715 47.2296,21.3261 C47.5628,21.1628 47.4837,20.7340 47.5529,20.4321 Z"></path>
              <path d="M42.9212,24.2177 C43.5826,24.9962 44.0758,25.9018 44.5261,26.8140 C43.7822,27.2214 43.0564,27.6832 42.3769,28.1962 C42.0008,27.5876 41.6676,26.9459 41.2041,26.3983 C40.4288,26.9261 39.9884,27.7971 39.2989,28.4206 C38.4181,29.2305 37.6940,30.2301 36.6680,30.8635 C36.8000,30.0519 36.9352,29.2404 37.0193,28.4239 C37.3162,28.2936 37.6247,28.1797 37.8903,27.9917 C38.9426,27.1010 40.1237,26.3802 41.2057,25.5274 C41.8375,25.1760 42.5138,24.8445 42.9212,24.2177 Z M18.3769,41.7583 C18.7628,42.2383 19.0070,42.8140 19.3600,43.3171 C19.7047,43.8845 20.1402,44.3975 20.4239,44.9995 C18.9509,45.0375 17.4762,44.9946 16.0032,45.0342 C15.2676,45.0210 14.5270,45.0919 13.7962,44.9764 C14.0453,44.8610 14.2647,44.6927 14.4527,44.4931 C14.7694,44.1352 15.3517,44.0956 15.5447,43.6189 C15.8515,43.7410 16.1682,43.8301 16.4931,43.8894 C16.4371,43.6783 16.3777,43.4672 16.3018,43.2626 C16.8956,42.6325 17.6758,42.2482 18.3769,41.7583 Z"></path>
              <path d="M27.0465,34.3158 C29.6263,33.0985 31.9736,31.4540 34.1888,29.6692 C33.9744,31.0564 33.6544,32.4239 33.2948,33.7797 L33.2767,33.7880 C32.3579,34.1773 31.6140,34.8618 30.7414,35.3319 C29.8919,35.8812 28.9220,36.2375 28.1303,36.8692 C26.7876,36.5410 25.4630,36.1352 24.1698,35.6470 C25.1199,35.1835 26.1228,34.8321 27.0465,34.3158 Z"></path>
              <path d="M11.8746,31.4573 C12.9748,32.3645 14.0981,33.2470 15.2940,34.0239 C15.2247,34.1954 15.2181,34.3670 15.2725,34.5402 C15.4688,35.1884 15.6898,35.8284 15.9307,36.4618 C15.3319,37.1826 14.4164,37.5076 13.7319,38.1327 C13.7171,38.0915 13.6841,38.0107 13.6676,37.9694 C12.9665,36.1105 12.3562,34.2136 11.9290,32.2721 C11.8795,32.0032 11.8795,31.7278 11.8746,31.4573 Z"></path>
              <path d="M6.7777,40.4437 C8.1237,40.5723 9.4696,40.6696 10.8206,40.6878 C11.4655,41.3756 12.3002,41.8342 13.0886,42.3356 C13.8688,42.8321 14.7018,43.2412 15.5447,43.6189 C15.3517,44.0956 14.7694,44.1352 14.4527,44.4931 C14.2647,44.6927 14.0453,44.8610 13.7962,44.9764 C13.1892,45.0111 12.5129,45.1216 11.9802,44.7538 C10.1030,43.6701 8.3331,42.3637 6.8486,40.7802 C6.8305,40.6960 6.7958,40.5278 6.7777,40.4437 "></path>
            </g>
          </svg>
        </span>
        <span>${_btu_translate("usingBTU.btuDirect")}</span>
      </button>
    </div>
    <div class="btu-create-list">
      <button id="btu-btn-trust" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M17.493 7C21.335 9.948 25.741 9.766 27 9.766C26.725 26.532 24.627 24.299 17.493 29C10.360 24.299 8.275 26.532 8 9.7662C9.246 9.766 13.651 9.948 17.493 7Z" stroke="#4B82ED" stroke-width="2.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span>${_btu_translate("usingBTU.trustWallet")}</span>
      </button>
    </div>
    <div class="btu-create-list">
      <button id="btu-btn-has" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#4B82ED"/></svg>
        </span>
        <span>${_btu_translate("usingBTU.hasWalletMobile")}</span>
      </button>
    </div>
  `
}

// Bloc non-connecté si mobile
const _btu_createMobile = () => {
  if (_btu_getLanguage() === 'fr')
    return _btu_createMobileFr()
  return _btu_createMobileEn()
}

// Bloc non-connecté si desktop
const _btu_createDesktop = () => {
  return `
    <div class="btu-create-list">
      <button id="btu-btn-create" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="24px" height="23px" viewBox="0 0 48 46" version="1.1">
            <path fill="#4B82ED" d="M18.3818,0.7637 C21.9810,-0.0989 25.7731,-0.0775 29.3789,0.7340 C29.4004,0.7653 29.4432,0.8263 29.4663,0.8577 C30.3224,2.0255 31.1521,3.2131 31.8878,4.4618 C32.5459,5.5472 33.1216,6.6771 33.6791,7.8169 C35.1637,7.7294 36.6548,7.6602 38.1426,7.7476 C39.2824,7.7773 40.4140,7.9125 41.5488,8.0164 L41.6824,8.0247 C43.0713,9.5686 44.2556,11.2907 45.2107,13.1331 C44.8164,14.3307 44.3826,15.5117 43.8828,16.6680 C43.0482,14.4577 41.8523,12.3975 40.3777,10.5534 C38.5187,10.3455 36.6432,10.3175 34.7744,10.3950 C35.6189,12.6268 36.2523,14.9344 36.6861,17.2816 C36.9072,18.6358 37.0952,19.9983 37.1744,21.3707 C37.0144,22.0701 37.7385,22.3637 37.9397,22.9459 C38.4428,24.0016 38.1096,25.3311 37.2239,26.0783 C37.2123,26.2169 37.1909,26.4907 37.1793,26.6276 C37.1397,27.2280 37.0952,27.8268 37.0193,28.4239 C36.9352,29.2404 36.8,30.0519 36.6680,30.8635 C36.2342,33.2437 35.5744,35.5793 34.7134,37.8408 C36.5476,37.9249 38.3835,37.8837 40.2111,37.7138 C41.8375,35.7624 43.1323,33.5307 43.9736,31.1307 C44.4206,29.9183 44.7059,28.6548 44.9352,27.3863 C45.5637,28.5839 46.1575,29.7979 46.6919,31.04 L46.7513,31.1719 C45.6527,34.6193 43.8020,37.8639 41.2734,40.4519 C38.7265,40.4684 36.1731,40.6284 33.6313,40.4041 C33.0193,41.5455 32.4453,42.7084 31.7723,43.8169 C30.5946,44.2754 29.3822,44.64 28.1451,44.8940 L27.8614,44.9567 C28.96,43.4078 29.9595,41.7880 30.8206,40.0956 C28.4981,39.7261 26.2037,39.1703 23.9851,38.3884 C22.7068,37.9364 21.4465,37.4268 20.2259,36.8395 C19.9686,36.7142 19.7113,36.5938 19.4540,36.4734 C18.7183,36.8016 17.8375,36.8280 17.1167,36.4453 C16.3101,36.0428 15.7591,35.2049 15.6832,34.3109 C15.5859,34.24 15.3913,34.0964 15.2940,34.0239 C14.0981,33.2470 12.9748,32.3645 11.8746,31.4573 C10.0651,29.9035 8.3892,28.1962 6.88,26.3505 C5.7880,28 4.8527,29.7468 4.0247,31.5414 C4.8643,33.8672 6.1905,35.9967 7.7723,37.8886 C9.7319,38.0569 11.7047,38.1030 13.6676,37.9694 C13.6841,38.0107 13.7171,38.0915 13.7319,38.1327 C14.0618,38.9426 14.4098,39.7443 14.7826,40.5360 C13.4630,40.6301 12.1435,40.7175 10.8206,40.6878 C9.4696,40.6696 8.1237,40.5723 6.7777,40.4437 C6.7018,40.4338 6.5501,40.4156 6.4742,40.4057 C3.3764,37.0837 1.2206,32.8808 0.4090,28.4057 C-0.1764,25.2420 -0.1336,21.9546 0.5723,18.8123 C1.4350,14.9096 3.3105,11.2412 5.9529,8.2457 C9.1909,4.5492 13.5950,1.8837 18.3818,0.7637 L18.3818,0.7637 Z M20.5080,3.0383 C19.2032,3.2626 17.9051,3.5694 16.6663,4.0445 C14.4428,4.8346 12.3810,6.0404 10.5303,7.4985 C9.4878,8.3760 8.4849,9.3113 7.6288,10.3752 C6.0750,12.2259 4.8098,14.3472 4.0032,16.6235 C4.8181,18.4511 5.7797,20.2144 6.8816,21.8870 C8.3562,20.0692 10.0156,18.4032 11.7657,16.8593 C12.8775,15.9901 13.9529,15.0597 15.1604,14.3257 L15.1587,14.2977 C15.3435,14.1756 15.5249,14.0486 15.7047,13.9167 C15.7080,13.3723 15.8432,12.8230 16.1550,12.3711 C16.8989,11.1967 18.6078,10.8404 19.7657,11.6057 C19.9620,11.5167 20.1583,11.4259 20.3562,11.3369 C21.5538,10.7447 22.8123,10.2927 24.0511,9.8012 C26.2828,9.0639 28.5756,8.5014 30.8948,8.1154 C30.0057,6.3802 29.0061,4.7010 27.8548,3.1257 C25.4334,2.6771 22.9410,2.6622 20.5080,3.0383 L20.5080,3.0383 Z M28.1253,11.3731 C26.8024,11.6931 25.4993,12.0940 24.2259,12.5707 L24.2787,12.5921 C23.1455,12.9006 22.0849,13.4713 21.0012,13.9331 C20.9105,14.6721 20.6020,15.4111 19.9983,15.8762 C19.2049,16.5426 18.0239,16.6432 17.1117,16.1632 C16.0280,16.8907 14.9525,17.6395 13.9694,18.5022 C12.8445,19.3913 11.8037,20.3859 10.8123,21.4202 C9.9859,22.2762 9.2206,23.1884 8.4816,24.1187 C9.2931,25.1414 10.1360,26.1410 11.0581,27.0663 L11.0531,27.0878 C12.0412,28.0610 13.0391,29.0292 14.1327,29.8853 C14.9971,30.6094 15.9158,31.2643 16.8445,31.8993 C17.6659,31.3550 18.7859,31.3187 19.6338,31.8235 C20.4964,32.3084 20.9863,33.2964 20.9567,34.2729 C22.0107,34.7711 23.0729,35.2527 24.1698,35.6470 C25.4630,36.1352 26.7876,36.5410 28.1303,36.8692 C29.3938,37.1826 30.6771,37.4070 31.9653,37.5917 C32.4684,36.3480 32.9204,35.0828 33.2767,33.7880 L33.2948,33.7797 C33.6544,32.4239 33.9744,31.0564 34.1888,29.6692 C34.3604,28.6152 34.4659,27.5529 34.5550,26.4874 C33.8721,26.1888 33.3030,25.6214 33.0606,24.9105 C32.5723,23.6288 33.2865,22.0898 34.5517,21.5901 C34.4692,20.5080 34.3620,19.4276 34.1789,18.3587 C33.9744,16.9731 33.6478,15.6090 33.2816,14.2597 C32.9204,13.0342 32.5063,11.8268 32.0346,10.6408 C30.72,10.8206 29.4119,11.0482 28.1253,11.3731 L28.1253,11.3731 Z M2.9459,20.4618 C2.5567,22.8783 2.5534,25.3525 2.9591,27.7674 C3.6387,26.5105 4.4057,25.3047 5.2008,24.1171 C4.3958,22.9311 3.6453,21.7121 2.9459,20.4618 Z"></path>
            <g fill="#4B82ED" opacity="0.2">
              <path d="M29.4663,0.8577 C29.7105,0.7637 29.9546,0.8973 30.1921,0.9468 C32.1781,1.5076 34.1344,2.2647 35.8861,3.3649 C35.2544,4.0725 34.3686,4.4767 33.6874,5.1315 C33.1035,4.8725 32.5459,4.4684 31.8878,4.4618 C31.1521,3.2131 30.3224,2.0255 29.4663,0.8577 Z"></path>
              <path d="M16.6663,4.0445 C17.9051,3.5694 19.2032,3.2626 20.5080,3.0383 C19.4210,4.6482 18.3290,6.2713 17.5076,8.0379 C19.4903,8.3562 21.4465,8.8296 23.3534,9.4614 C23.6024,9.5373 23.8317,9.6593 24.0511,9.8012 C22.8123,10.2927 21.5538,10.7447 20.3562,11.3369 C19.0416,10.9855 17.7022,10.7134 16.3513,10.5468 C15.8779,11.6931 15.4408,12.8626 15.1323,14.0635 L15.1587,14.2977 L15.1604,14.3257 C13.9529,15.0597 12.8775,15.9901 11.7657,16.8593 C12.0824,14.5913 12.8676,12.4255 13.5653,10.2564 C11.5859,10.1377 9.6016,10.1872 7.6288,10.3752 C8.4849,9.3113 9.4878,8.3760 10.5303,7.4985 C11.9175,7.5810 13.3113,7.5612 14.6985,7.6734 C15.3336,6.4527 15.9719,5.2338 16.6663,4.0445 Z"></path>
              <path d="M35.8861,3.3649 L35.9142,3.3319 C37.8457,4.4668 39.6189,5.8705 41.1694,7.4870 C41.3129,7.6486 41.4960,7.7954 41.5488,8.0164 C40.4140,7.9125 39.2824,7.7773 38.1426,7.7476 C37.5224,7.7410 37.0523,7.3220 36.5954,6.9591 C35.6849,6.2614 34.6853,5.6923 33.6874,5.1315 C34.3686,4.4767 35.2544,4.0725 35.8861,3.3649 Z"></path>
              <path d="M24.2259,12.5707 C25.4993,12.0940 26.8024,11.6931 28.1253,11.3731 C29.2964,11.9950 30.4775,12.6037 31.5909,13.3294 C30.9179,13.9942 30.0519,14.4082 29.3591,15.0515 C27.7426,14.0849 26.0222,13.3047 24.2787,12.5921 L24.2259,12.5707 Z M10.8123,21.4202 C11.8037,20.3859 12.8445,19.3913 13.9694,18.5022 C14.1162,18.9624 14.0057,19.4408 13.9480,19.9059 C13.5422,23.2214 13.6577,26.5847 14.1327,29.8853 C13.0391,29.0292 12.0412,28.0610 11.0531,27.0878 L11.0581,27.0663 C11.1785,26.7480 11.1257,26.4065 11.1158,26.0767 C11.0185,24.5080 11.0432,22.9344 11.1290,21.3641 C11.0498,21.3789 10.8915,21.4070 10.8123,21.4202 Z"></path>
              <path d="M43.8828,16.6680 C44.3826,15.5117 44.8164,14.3307 45.2107,13.1331 C46.4049,15.4045 47.1719,17.8969 47.5529,20.4321 C47.4837,20.7340 47.5628,21.1628 47.2296,21.3261 C46.5435,21.7715 45.9200,22.3274 45.1645,22.6556 C45.0919,22.0206 45.0688,21.3707 44.8742,20.7554 C44.3496,21.4268 44.0065,22.2169 43.5200,22.9129 C43.2857,23.3270 42.8668,23.7014 42.9212,24.2177 C42.5138,24.8445 41.8375,25.1760 41.2057,25.5274 C40.1237,26.3802 38.9426,27.1010 37.8903,27.9917 C37.6247,28.1797 37.3162,28.2936 37.0193,28.4239 C37.0952,27.8268 37.1397,27.2280 37.1793,26.6276 C38.1377,25.9331 38.8865,24.9632 39.5200,23.9752 C39.0301,23.2775 38.4049,22.6886 37.9068,21.9958 C38.5204,21.3723 39.4589,21.0952 39.8597,20.2738 C40.3249,20.7241 40.7191,21.2387 41.1265,21.7402 C42.2301,20.1583 43.0614,18.4082 43.8828,16.6680 Z M15.9307,36.4618 C16.1088,36.8577 16.2045,37.3047 16.4948,37.6379 C17.7567,37.4762 19.0152,37.2404 20.2259,36.8395 C21.4465,37.4268 22.7068,37.9364 23.9851,38.3884 C23.8301,38.5006 23.6635,38.5896 23.4837,38.6540 C21.5967,39.3105 19.6503,39.7839 17.6857,40.1468 C17.6560,40.7389 18.2119,41.1975 18.3769,41.7583 C17.6758,42.2482 16.8956,42.6325 16.3018,43.2626 C15.6964,42.4115 15.2857,41.4465 14.7826,40.5360 C14.4098,39.7443 14.0618,38.9426 13.7319,38.1327 C14.4164,37.5076 15.3319,37.1826 15.9307,36.4618 Z"></path>
              <path d="M31.5909,13.3294 C32.1797,13.5901 32.6284,14.1740 33.2816,14.2597 C33.6478,15.6090 33.9744,16.9731 34.1789,18.3587 C32.6152,17.1942 31.0482,16.0313 29.3591,15.0515 C30.0519,14.4082 30.9179,13.9942 31.5909,13.3294 Z"></path>
              <path d="M36.6861,17.2816 C36.9698,17.4053 37.2453,17.5571 37.4647,17.7814 C38.2861,18.5896 39.1224,19.3863 39.8597,20.2738 C39.4589,21.0952 38.5204,21.3723 37.9068,21.9958 C37.6907,21.7567 37.4367,21.5538 37.1744,21.3707 C37.0952,19.9983 36.9072,18.6358 36.6861,17.2816 Z"></path>
              <path d="M47.5529,20.4321 C47.9142,22.1096 47.8647,23.8647 47.7954,25.5785 C47.5777,27.4193 47.3682,29.3030 46.6919,31.0400 C46.1575,29.7979 45.5637,28.5839 44.9352,27.3863 C44.7059,28.6548 44.4206,29.9183 43.9736,31.1307 C43.3105,30.2284 42.9327,29.1612 42.3769,28.1962 C43.0564,27.6832 43.7822,27.2214 44.5261,26.8140 C44.6218,26.8800 44.8131,27.0119 44.9072,27.0779 C45.2338,25.6395 45.1595,24.1286 45.1645,22.6556 C45.9199,22.3274 46.5435,21.7715 47.2296,21.3261 C47.5628,21.1628 47.4837,20.7340 47.5529,20.4321 Z"></path>
              <path d="M42.9212,24.2177 C43.5826,24.9962 44.0758,25.9018 44.5261,26.8140 C43.7822,27.2214 43.0564,27.6832 42.3769,28.1962 C42.0008,27.5876 41.6676,26.9459 41.2041,26.3983 C40.4288,26.9261 39.9884,27.7971 39.2989,28.4206 C38.4181,29.2305 37.6940,30.2301 36.6680,30.8635 C36.8000,30.0519 36.9352,29.2404 37.0193,28.4239 C37.3162,28.2936 37.6247,28.1797 37.8903,27.9917 C38.9426,27.1010 40.1237,26.3802 41.2057,25.5274 C41.8375,25.1760 42.5138,24.8445 42.9212,24.2177 Z M18.3769,41.7583 C18.7628,42.2383 19.0070,42.8140 19.3600,43.3171 C19.7047,43.8845 20.1402,44.3975 20.4239,44.9995 C18.9509,45.0375 17.4762,44.9946 16.0032,45.0342 C15.2676,45.0210 14.5270,45.0919 13.7962,44.9764 C14.0453,44.8610 14.2647,44.6927 14.4527,44.4931 C14.7694,44.1352 15.3517,44.0956 15.5447,43.6189 C15.8515,43.7410 16.1682,43.8301 16.4931,43.8894 C16.4371,43.6783 16.3777,43.4672 16.3018,43.2626 C16.8956,42.6325 17.6758,42.2482 18.3769,41.7583 Z"></path>
              <path d="M27.0465,34.3158 C29.6263,33.0985 31.9736,31.4540 34.1888,29.6692 C33.9744,31.0564 33.6544,32.4239 33.2948,33.7797 L33.2767,33.7880 C32.3579,34.1773 31.6140,34.8618 30.7414,35.3319 C29.8919,35.8812 28.9220,36.2375 28.1303,36.8692 C26.7876,36.5410 25.4630,36.1352 24.1698,35.6470 C25.1199,35.1835 26.1228,34.8321 27.0465,34.3158 Z"></path>
              <path d="M11.8746,31.4573 C12.9748,32.3645 14.0981,33.2470 15.2940,34.0239 C15.2247,34.1954 15.2181,34.3670 15.2725,34.5402 C15.4688,35.1884 15.6898,35.8284 15.9307,36.4618 C15.3319,37.1826 14.4164,37.5076 13.7319,38.1327 C13.7171,38.0915 13.6841,38.0107 13.6676,37.9694 C12.9665,36.1105 12.3562,34.2136 11.9290,32.2721 C11.8795,32.0032 11.8795,31.7278 11.8746,31.4573 Z"></path>
              <path d="M6.7777,40.4437 C8.1237,40.5723 9.4696,40.6696 10.8206,40.6878 C11.4655,41.3756 12.3002,41.8342 13.0886,42.3356 C13.8688,42.8321 14.7018,43.2412 15.5447,43.6189 C15.3517,44.0956 14.7694,44.1352 14.4527,44.4931 C14.2647,44.6927 14.0453,44.8610 13.7962,44.9764 C13.1892,45.0111 12.5129,45.1216 11.9802,44.7538 C10.1030,43.6701 8.3331,42.3637 6.8486,40.7802 C6.8305,40.6960 6.7958,40.5278 6.7777,40.4437 "></path>
            </g>
          </svg>
        </span>
        <span>${_btu_translate("usingBTU.btuDirect")}</span>
      </button>
    </div>
    <div class="btu-create-list">
      <button id="btu-btn-wallet-connect" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M10.3227 13.1261C14.5628 8.95796 21.4372 8.95796 25.6773 13.1261L26.1876 13.6278C26.3996 13.8362 26.3996 14.1741 26.1876 14.3825L24.442 16.0985C24.336 16.2027 24.1641 16.2027 24.0581 16.0985L23.3559 15.4082C20.3979 12.5004 15.6021 12.5004 12.6442 15.4082L11.8921 16.1475C11.7861 16.2517 11.6143 16.2517 11.5083 16.1475L9.76264 14.4314C9.55064 14.223 9.55064 13.8851 9.76264 13.6767L10.3227 13.1261ZM29.2874 16.675L30.841 18.2023C31.053 18.4107 31.053 18.7486 30.841 18.957L23.8357 25.8437C23.6237 26.0521 23.28 26.0521 23.068 25.8437C23.068 25.8437 23.068 25.8437 23.068 25.8437L18.096 20.956C18.043 20.9039 17.9571 20.9039 17.9041 20.956C17.9041 20.956 17.9041 20.956 17.9041 20.956L12.9322 25.8437C12.7202 26.0521 12.3765 26.0521 12.1645 25.8437C12.1645 25.8437 12.1645 25.8437 12.1645 25.8437L5.159 18.9569C4.947 18.7485 4.947 18.4106 5.159 18.2022L6.71261 16.675C6.92461 16.4666 7.26833 16.4666 7.48034 16.675L12.4524 21.5627C12.5054 21.6148 12.5913 21.6148 12.6443 21.5627C12.6443 21.5627 12.6443 21.5627 12.6443 21.5627L17.6161 16.675C17.8281 16.4665 18.1718 16.4665 18.3838 16.6749C18.3838 16.6749 18.3838 16.6749 18.3838 16.6749L23.3558 21.5627C23.4088 21.6148 23.4947 21.6148 23.5477 21.5627L28.5197 16.675C28.7317 16.4666 29.0754 16.4666 29.2874 16.675Z" fill="#4B82ED"/></svg>
        </span>
        <span>${_btu_translate("usingBTU.walletConnect")}</span>
      </button>
    </div>
    <div class="btu-create-list">
      <button id="btu-btn-has" class="btu-create-list-btn">
        <span class="btu-create-list-image">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#4B82ED"/></svg>
        </span>
        <span>${_btu_translate("usingBTU.hasWalletMobile")}</span>
      </button>
    </div>
  `
}

// Popup si on n'est pas connecté à une addresse wallet
const _btu_templateModalCreateContent = () => {
  return {
    top: `
      <h1>
        ${/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? _btu_translate("usingBTU.usingMobile")
        : _btu_translate("usingBTU.using")
        }
      </h1>
    `,
    bottom: `
      <div id="btu-modal-content-inner">
        ${/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? _btu_createMobile()
        : _btu_createDesktop()
        }
      </div>
    </div>
    `,
  }
}

const _btu_googlePlay = () => {
  if (_btu_getLanguage() === 'fr')
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 60"><defs><linearGradient id="a" x1="31.8" y1="183.29" x2="15.02" y2="166.51" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00a0ff"/><stop offset=".01" stop-color="#00a1ff"/><stop offset=".26" stop-color="#00beff"/><stop offset=".51" stop-color="#00d2ff"/><stop offset=".76" stop-color="#00dfff"/><stop offset="1" stop-color="#00e3ff"/></linearGradient><linearGradient id="b" x1="43.83" y1="172" x2="19.64" y2="172" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe000"/><stop offset=".41" stop-color="#ffbd00"/><stop offset=".78" stop-color="orange"/><stop offset="1" stop-color="#ff9c00"/></linearGradient><linearGradient id="c" x1="34.83" y1="169.7" x2="12.07" y2="146.95" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff3a44"/><stop offset="1" stop-color="#c31162"/></linearGradient><linearGradient id="d" x1="17.3" y1="191.82" x2="27.46" y2="181.66" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32a071"/><stop offset=".07" stop-color="#2da771"/><stop offset=".48" stop-color="#15cf74"/><stop offset=".8" stop-color="#06e775"/><stop offset="1" stop-color="#00f076"/></linearGradient></defs><title>fr_get</title><path fill="none" d="M0 0h155v60H0z"/><rect x="10" y="10" width="135" height="40" rx="5" ry="5"/><path d="M140 10.8a4.2 4.2 0 0 1 4.2 4.2v30a4.2 4.2 0 0 1-4.2 4.2H15a4.2 4.2 0 0 1-4.2-4.2V15a4.2 4.2 0 0 1 4.2-4.2h125m0-.8H15a5 5 0 0 0-5 5v30a5 5 0 0 0 5 5h125a5 5 0 0 0 5-5V15a5 5 0 0 0-5-5z" fill="#a6a6a6"/><path d="M78.14 31.75A4.25 4.25 0 1 0 82.41 36a4.19 4.19 0 0 0-4.27-4.25zm0 6.83a2.58 2.58 0 1 1 2.4-2.58 2.46 2.46 0 0 1-2.4 2.58zm-9.31-6.83A4.25 4.25 0 1 0 73.09 36a4.19 4.19 0 0 0-4.27-4.25zm0 6.83A2.58 2.58 0 1 1 71.22 36a2.46 2.46 0 0 1-2.4 2.58zm-11.09-5.52v1.8h4.32a3.77 3.77 0 0 1-1 2.27 4.42 4.42 0 0 1-3.33 1.32 4.8 4.8 0 0 1 0-9.6A4.6 4.6 0 0 1 61 30.14l1.27-1.27A6.29 6.29 0 0 0 57.74 27a6.61 6.61 0 1 0 0 13.21 6 6 0 0 0 4.61-1.85 6 6 0 0 0 1.56-4.22 5.87 5.87 0 0 0-.1-1.13zm45.31 1.4a4 4 0 0 0-3.64-2.71 4 4 0 0 0-4 4.25 4.16 4.16 0 0 0 4.22 4.25 4.23 4.23 0 0 0 3.54-1.88l-1.45-1a2.43 2.43 0 0 1-2.09 1.18 2.16 2.16 0 0 1-2.06-1.29l5.69-2.35zm-5.8 1.42a2.33 2.33 0 0 1 2.22-2.48 1.65 1.65 0 0 1 1.58.9zM92.63 40h1.87V27.5h-1.87zm-3.06-7.3h-.07a3 3 0 0 0-2.24-1 4.26 4.26 0 0 0 0 8.51 2.9 2.9 0 0 0 2.24-1h.06v.61c0 1.63-.87 2.5-2.27 2.5a2.35 2.35 0 0 1-2.14-1.51l-1.63.68A4.05 4.05 0 0 0 87.29 44c2.19 0 4-1.29 4-4.43V32h-1.72zm-2.14 5.88a2.59 2.59 0 0 1 0-5.16A2.4 2.4 0 0 1 89.7 36a2.38 2.38 0 0 1-2.28 2.58zm24.38-11.08h-4.47V40h1.87v-4.74h2.61a3.89 3.89 0 1 0 0-7.76zm0 6h-2.61v-4.26h2.65a2.14 2.14 0 1 1 0 4.29zm11.53-1.8a3.5 3.5 0 0 0-3.33 1.91l1.66.69a1.77 1.77 0 0 1 1.7-.92 1.8 1.8 0 0 1 2 1.61v.13a4.13 4.13 0 0 0-1.95-.48c-1.79 0-3.6 1-3.6 2.81a2.89 2.89 0 0 0 3.1 2.75 2.63 2.63 0 0 0 2.4-1.2h.06v1h1.8v-4.81c0-2.19-1.66-3.46-3.79-3.46zm-.23 6.85c-.61 0-1.46-.31-1.46-1.06 0-1 1.06-1.33 2-1.33a3.32 3.32 0 0 1 1.7.42 2.26 2.26 0 0 1-2.19 2zM133.74 32l-2.14 5.42h-.06L129.32 32h-2l3.33 7.58-1.9 4.21h1.95L135.82 32zm-16.81 8h1.87V27.5h-1.87z" fill="#fff"/><path d="M20.44 17.54a2 2 0 0 0-.46 1.4v22.12a2 2 0 0 0 .46 1.4l.07.07L32.9 30.15v-.29L20.51 17.47z" fill="url(#a)"/><path d="M37 34.28l-4.1-4.13v-.29l4.1-4.14.09.05L42 28.56c1.4.79 1.4 2.09 0 2.89l-4.89 2.78z" fill="url(#b)"/><path d="M37.12 34.22L32.9 30 20.44 42.46a1.63 1.63 0 0 0 2.08.06l14.61-8.3" fill="url(#c)"/><path d="M37.12 25.78l-14.61-8.3a1.63 1.63 0 0 0-2.08.06L32.9 30z" fill="url(#d)"/><path d="M37 34.13l-14.49 8.25a1.67 1.67 0 0 1-2 0l-.07.07.07.07a1.66 1.66 0 0 0 2 0l14.61-8.3z" style="isolation:isolate" opacity=".2"/><path d="M20.44 42.32a2 2 0 0 1-.46-1.4v.15a2 2 0 0 0 .46 1.4l.07-.07zM42 31.3l-5 2.83.09.09L42 31.44A1.75 1.75 0 0 0 43 30a1.86 1.86 0 0 1-1 1.3z" style="isolation:isolate" opacity=".12"/><path d="M22.51 17.62L42 28.7a1.86 1.86 0 0 1 1 1.3 1.75 1.75 0 0 0-1-1.44L22.51 17.48c-1.4-.79-2.54-.13-2.54 1.47v.15c.03-1.61 1.15-2.27 2.54-1.48z" style="isolation:isolate" fill="#fff" opacity=".25"/><path d="M51.28 23v-6h1.84a3 3 0 0 1 2.21.83 2.94 2.94 0 0 1 .83 2.17 2.94 2.94 0 0 1-.83 2.17 3 3 0 0 1-2.21.83zm.77-.74h1.06a2.25 2.25 0 0 0 1.65-.6 2.23 2.23 0 0 0 .61-1.66 2.09 2.09 0 0 0-2.25-2.26H52zM57.24 23v-6H58v6zM61.07 23.13a2.24 2.24 0 0 1-1.28-.43 2 2 0 0 1-.82-1.2l.7-.28a1.61 1.61 0 0 0 .51.83 1.3 1.3 0 0 0 .88.34 1.4 1.4 0 0 0 .86-.26.84.84 0 0 0 .36-.72.92.92 0 0 0-.36-.77 3.69 3.69 0 0 0-1.13-.51 3 3 0 0 1-1.21-.65 1.36 1.36 0 0 1-.41-1 1.49 1.49 0 0 1 .51-1.12 1.87 1.87 0 0 1 1.32-.49 1.93 1.93 0 0 1 1.24.38 1.76 1.76 0 0 1 .62.83l-.7.29a1 1 0 0 0-.37-.53 1.31 1.31 0 0 0-1.53 0 .75.75 0 0 0-.31.62.7.7 0 0 0 .29.57 2.78 2.78 0 0 0 .85.41 7.23 7.23 0 0 1 .74.28 3.38 3.38 0 0 1 .6.36 1.42 1.42 0 0 1 .46.55 1.79 1.79 0 0 1 .16.77 1.65 1.65 0 0 1-.18.78 1.46 1.46 0 0 1-.48.54 2.37 2.37 0 0 1-.64.31 2.4 2.4 0 0 1-.68.1zM65 23h-.77v-6h2a1.9 1.9 0 0 1 1.32.51 1.74 1.74 0 0 1 0 2.56 1.89 1.89 0 0 1-1.32.51H65zm0-3.17h1.29a1 1 0 0 0 .78-.33 1 1 0 0 0 0-1.44 1 1 0 0 0-.78-.33H65zM74 22.22a3.12 3.12 0 0 1-4.4 0 3.24 3.24 0 0 1 0-4.45 3.1 3.1 0 0 1 4.4 0 3.23 3.23 0 0 1 0 4.45zm-3.83-.5a2.31 2.31 0 0 0 3.26 0 2.56 2.56 0 0 0 0-3.44 2.31 2.31 0 0 0-3.26 0 2.56 2.56 0 0 0 0 3.44zM75.95 23v-6h.94l2.92 4.67V17h.77v6h-.8l-3.05-4.89V23zM81.95 23v-6h.77v6zM84.09 23v-6h2.17a1.76 1.76 0 0 1 1.22.46 1.51 1.51 0 0 1 .52 1.17 1.31 1.31 0 0 1-.22.75 1.39 1.39 0 0 1-.59.49 1.52 1.52 0 0 1 .73.52 1.36 1.36 0 0 1 .29.86 1.57 1.57 0 0 1-.54 1.22 1.85 1.85 0 0 1-1.28.49zm.77-3.43h1.4a.9.9 0 0 0 .7-.29A.89.89 0 0 0 87 18a.86.86 0 0 0-.67-.29h-1.47zm0 2.69h1.55a.92.92 0 0 0 .72-.31 1 1 0 0 0 .28-.68 1 1 0 0 0-1-1h-1.55zM89.24 23v-6H90v5.26h2.6V23zM97.08 17.74h-2.73v1.9h2.46v.72h-2.46v1.9h2.73V23h-3.5v-6h3.5zM101.74 23.13a2.24 2.24 0 0 1-1.28-.43 2 2 0 0 1-.82-1.2l.7-.28a1.61 1.61 0 0 0 .51.83 1.3 1.3 0 0 0 .88.34 1.4 1.4 0 0 0 .86-.26.84.84 0 0 0 .36-.72.92.92 0 0 0-.36-.77 3.69 3.69 0 0 0-1.13-.51 3 3 0 0 1-1.21-.65 1.36 1.36 0 0 1-.41-1 1.49 1.49 0 0 1 .51-1.12 1.87 1.87 0 0 1 1.33-.48 1.93 1.93 0 0 1 1.24.38 1.76 1.76 0 0 1 .62.83l-.7.29a1 1 0 0 0-.37-.53 1.31 1.31 0 0 0-1.53 0 .75.75 0 0 0-.31.62.7.7 0 0 0 .29.57 2.78 2.78 0 0 0 .85.41 7.24 7.24 0 0 1 .74.28 3.38 3.38 0 0 1 .6.36 1.42 1.42 0 0 1 .46.55 1.79 1.79 0 0 1 .16.77 1.65 1.65 0 0 1-.18.78 1.46 1.46 0 0 1-.48.54 2.37 2.37 0 0 1-.64.31 2.4 2.4 0 0 1-.69.09zM106.94 23.13a2.11 2.11 0 0 1-1.61-.65 2.39 2.39 0 0 1-.62-1.71V17h.77v3.8a1.72 1.72 0 0 0 .37 1.15A1.54 1.54 0 0 0 108 22a1.72 1.72 0 0 0 .37-1.15V17h.77v3.77a2.43 2.43 0 0 1-.6 1.71 2.1 2.1 0 0 1-1.6.65zM110.4 23v-6h2a1.9 1.9 0 0 1 1.32.51 1.73 1.73 0 0 1 .15 2.39 1.78 1.78 0 0 1-1 .61l1.68 2.49h-.91L112 20.57h-.86V23zm.77-3.15h1.24a1.13 1.13 0 0 0 .79-.3 1 1 0 0 0 .33-.76 1.06 1.06 0 0 0-.29-.72 1 1 0 0 0-.78-.33h-1.29z" fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width=".2"/></svg>
    `
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 60"><defs><linearGradient id="a" x1="31.8" y1="183.29" x2="15.02" y2="166.51" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00a0ff"/><stop offset=".01" stop-color="#00a1ff"/><stop offset=".26" stop-color="#00beff"/><stop offset=".51" stop-color="#00d2ff"/><stop offset=".76" stop-color="#00dfff"/><stop offset="1" stop-color="#00e3ff"/></linearGradient><linearGradient id="b" x1="43.83" y1="172" x2="19.64" y2="172" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe000"/><stop offset=".41" stop-color="#ffbd00"/><stop offset=".78" stop-color="orange"/><stop offset="1" stop-color="#ff9c00"/></linearGradient><linearGradient id="c" x1="34.83" y1="169.7" x2="12.07" y2="146.95" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff3a44"/><stop offset="1" stop-color="#c31162"/></linearGradient><linearGradient id="d" x1="17.3" y1="191.82" x2="27.46" y2="181.66" gradientTransform="matrix(1 0 0 -1 0 202)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32a071"/><stop offset=".07" stop-color="#2da771"/><stop offset=".48" stop-color="#15cf74"/><stop offset=".8" stop-color="#06e775"/><stop offset="1" stop-color="#00f076"/></linearGradient></defs><title>fil_get</title><path fill="none" d="M0 0h155v60H0z"/><rect x="10" y="10" width="135" height="40" rx="5" ry="5"/><path d="M140 10.8a4.2 4.2 0 0 1 4.2 4.2v30a4.2 4.2 0 0 1-4.2 4.2H15a4.2 4.2 0 0 1-4.2-4.2V15a4.2 4.2 0 0 1 4.2-4.2h125m0-.8H15a5 5 0 0 0-5 5v30a5 5 0 0 0 5 5h125a5 5 0 0 0 5-5V15a5 5 0 0 0-5-5z" fill="#a6a6a6"/><path d="M57.42 20.24a2.71 2.71 0 0 1-.75 2 2.91 2.91 0 0 1-2.2.89 3.15 3.15 0 0 1-2.21-5.37 3 3 0 0 1 2.21-.9 3.1 3.1 0 0 1 1.23.25 2.47 2.47 0 0 1 .94.67l-.53.53a2 2 0 0 0-1.64-.71 2.32 2.32 0 0 0-2.33 2.4 2.36 2.36 0 0 0 4 1.73 1.89 1.89 0 0 0 .5-1.22h-2.17v-.72h2.91a2.54 2.54 0 0 1 .04.45zM62 17.74h-2.7v1.9h2.46v.72H59.3v1.9H62V23h-3.5v-6H62zM65.28 23h-.77v-5.26h-1.68V17H67v.74h-1.72zM69.94 23v-6h.77v6zM74.13 23h-.77v-5.26h-1.68V17h4.12v.74h-1.67zM83.61 22.22a3.12 3.12 0 0 1-4.4 0 3.24 3.24 0 0 1 0-4.45 3.1 3.1 0 0 1 4.4 0 3.23 3.23 0 0 1 0 4.45zm-3.83-.5a2.31 2.31 0 0 0 3.26 0 2.56 2.56 0 0 0 0-3.44 2.31 2.31 0 0 0-3.26 0 2.56 2.56 0 0 0 0 3.44zM85.58 23v-6h.94l2.92 4.67V17h.77v6h-.8l-3.05-4.89V23z" fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width=".2"/><path d="M78.14 31.75A4.25 4.25 0 1 0 82.41 36a4.19 4.19 0 0 0-4.27-4.25zm0 6.83a2.58 2.58 0 1 1 2.4-2.58 2.46 2.46 0 0 1-2.4 2.58zm-9.31-6.83A4.25 4.25 0 1 0 73.09 36a4.19 4.19 0 0 0-4.27-4.25zm0 6.83A2.58 2.58 0 1 1 71.22 36a2.46 2.46 0 0 1-2.4 2.58zm-11.09-5.52v1.8h4.32a3.77 3.77 0 0 1-1 2.27 4.42 4.42 0 0 1-3.33 1.32 4.8 4.8 0 0 1 0-9.6A4.6 4.6 0 0 1 61 30.14l1.27-1.27A6.29 6.29 0 0 0 57.74 27a6.61 6.61 0 1 0 0 13.21 6 6 0 0 0 4.61-1.85 6 6 0 0 0 1.56-4.22 5.87 5.87 0 0 0-.1-1.13zm45.31 1.4a4 4 0 0 0-3.64-2.71 4 4 0 0 0-4 4.25 4.16 4.16 0 0 0 4.22 4.25 4.23 4.23 0 0 0 3.54-1.88l-1.45-1a2.43 2.43 0 0 1-2.09 1.18 2.16 2.16 0 0 1-2.06-1.29l5.69-2.35zm-5.8 1.42a2.33 2.33 0 0 1 2.22-2.48 1.65 1.65 0 0 1 1.58.9zM92.63 40h1.87V27.5h-1.87zm-3.06-7.3h-.07a3 3 0 0 0-2.24-1 4.26 4.26 0 0 0 0 8.51 2.9 2.9 0 0 0 2.24-1h.06v.61c0 1.63-.87 2.5-2.27 2.5a2.35 2.35 0 0 1-2.14-1.51l-1.63.68A4.05 4.05 0 0 0 87.29 44c2.19 0 4-1.29 4-4.43V32h-1.72zm-2.14 5.88a2.59 2.59 0 0 1 0-5.16A2.4 2.4 0 0 1 89.7 36a2.38 2.38 0 0 1-2.28 2.58zm24.38-11.08h-4.47V40h1.87v-4.74h2.61a3.89 3.89 0 1 0 0-7.76zm0 6h-2.61v-4.26h2.65a2.14 2.14 0 1 1 0 4.29zm11.53-1.8a3.5 3.5 0 0 0-3.33 1.91l1.66.69a1.77 1.77 0 0 1 1.7-.92 1.8 1.8 0 0 1 2 1.61v.13a4.13 4.13 0 0 0-1.95-.48c-1.79 0-3.6 1-3.6 2.81a2.89 2.89 0 0 0 3.1 2.75 2.63 2.63 0 0 0 2.4-1.2h.06v1h1.8v-4.81c0-2.19-1.66-3.46-3.79-3.46zm-.23 6.85c-.61 0-1.46-.31-1.46-1.06 0-1 1.06-1.33 2-1.33a3.32 3.32 0 0 1 1.7.42 2.26 2.26 0 0 1-2.19 2zM133.74 32l-2.14 5.42h-.06L129.32 32h-2l3.33 7.58-1.9 4.21h1.95L135.82 32zm-16.81 8h1.87V27.5h-1.87z" fill="#fff"/><path d="M20.44 17.54a2 2 0 0 0-.46 1.4v22.12a2 2 0 0 0 .46 1.4l.07.07L32.9 30.15v-.29L20.51 17.47z" fill="url(#a)"/><path d="M37 34.28l-4.1-4.13v-.29l4.1-4.14.09.05L42 28.56c1.4.79 1.4 2.09 0 2.89l-4.89 2.78z" fill="url(#b)"/><path d="M37.12 34.22L32.9 30 20.44 42.46a1.63 1.63 0 0 0 2.08.06l14.61-8.3" fill="url(#c)"/><path d="M37.12 25.78l-14.61-8.3a1.63 1.63 0 0 0-2.08.06L32.9 30z" fill="url(#d)"/><path d="M37 34.13l-14.49 8.25a1.67 1.67 0 0 1-2 0l-.07.07.07.07a1.66 1.66 0 0 0 2 0l14.61-8.3z" style="isolation:isolate" opacity=".2"/><path d="M20.44 42.32a2 2 0 0 1-.46-1.4v.15a2 2 0 0 0 .46 1.4l.07-.07zM42 31.3l-5 2.83.09.09L42 31.44A1.75 1.75 0 0 0 43 30a1.86 1.86 0 0 1-1 1.3z" style="isolation:isolate" opacity=".12"/><path d="M22.51 17.62L42 28.7a1.86 1.86 0 0 1 1 1.3 1.75 1.75 0 0 0-1-1.44L22.51 17.48c-1.4-.79-2.54-.13-2.54 1.47v.15c.03-1.61 1.15-2.27 2.54-1.48z" style="isolation:isolate" fill="#fff" opacity=".25"/></svg>
  `
}

const _btu_appleStore = () => {
  if (_btu_getLanguage() === 'fr')
    return `
      <svg class="btu-store-apple" width="145" height="44.6" viewBox="0 0 126.50 40"><path d="M116.97,0H9.53c-.36,0-.72,0-1.09.00-.30.00-.60.00-.91.01A13.21,13.21,0,0,0,5.51.19a6.66,6.66,0,0,0-1.90.62A6.43,6.43,0,0,0,1.99,1.99,6.25,6.25,0,0,0,.81,3.61a6.60,6.60,0,0,0-.62,1.90,12.99,12.99,0,0,0-.17,2.00C.00,7.83.00,8.13,0,8.44V31.55c.00.31.00.61.01.92a12.99,12.99,0,0,0,.17,2.00,6.58,6.58,0,0,0,.62,1.90A6.20,6.20,0,0,0,1.99,38.00a6.27,6.27,0,0,0,1.61,1.17,6.70,6.70,0,0,0,1.90.63,13.45,13.45,0,0,0,2.00.17c.30.00.61.01.91.01C8.80,40,9.16,40,9.53,40H116.97c.35,0,.72,0,1.08-.00.30,0,.61-.00.92-.01a13.27,13.27,0,0,0,2-.17,6.80,6.80,0,0,0,1.90-.63,6.27,6.27,0,0,0,1.61-1.17,6.39,6.39,0,0,0,1.18-1.61,6.60,6.60,0,0,0,.61-1.90,13.50,13.50,0,0,0,.18-2.00c.00-.31.00-.61.00-.92.00-.36.00-.72.00-1.09V9.53c0-.36,0-.72-.00-1.09,0-.30,0-.61-.00-.92a13.50,13.50,0,0,0-.18-2.00,6.61,6.61,0,0,0-.61-1.90,6.46,6.46,0,0,0-2.79-2.79,6.76,6.76,0,0,0-1.90-.62,13.04,13.04,0,0,0-2-.17c-.30-.00-.61-.01-.92-.01-.35-.00-.72-.00-1.08-.00Z" style="fill: #a6a6a6"/><path d="M8.44,39.12c-.30,0-.60-.00-.90-.01a12.68,12.68,0,0,1-1.86-.16,5.88,5.88,0,0,1-1.65-.54,5.40,5.40,0,0,1-1.39-1.01,5.32,5.32,0,0,1-1.02-1.39,5.72,5.72,0,0,1-.54-1.65,12.41,12.41,0,0,1-.16-1.87c-.00-.21-.01-.91-.01-.91V8.44S.88,7.75.88,7.54a12.37,12.37,0,0,1,.16-1.87,5.75,5.75,0,0,1,.54-1.66A5.37,5.37,0,0,1,2.61,2.61,5.56,5.56,0,0,1,4.01,1.59a5.82,5.82,0,0,1,1.65-.54A12.58,12.58,0,0,1,7.54.88L8.44.87h109.61l.91.01a12.38,12.38,0,0,1,1.85.16,5.93,5.93,0,0,1,1.67.54,5.59,5.59,0,0,1,2.41,2.41,5.76,5.76,0,0,1,.53,1.64,12.99,12.99,0,0,1,.17,1.88c.00.28.00.58.00.89.00.37.00.73.00,1.09V30.46c0,.36,0,.71-.00,1.07,0,.32,0,.62-.00.92a12.73,12.73,0,0,1-.17,1.85,5.73,5.73,0,0,1-.54,1.67,5.48,5.48,0,0,1-1.01,1.38,5.41,5.41,0,0,1-1.39,1.02,5.86,5.86,0,0,1-1.66.54,12.54,12.54,0,0,1-1.86.16c-.29.00-.59.01-.89.01l-1.08.00Z"/><path d="M24.77,20.30a4.94,4.94,0,0,1,2.35-4.15,5.06,5.06,0,0,0-3.99-2.15c-1.67-.17-3.30,1.00-4.16,1.00-.87,0-2.18-.98-3.60-.95a5.31,5.31,0,0,0-4.47,2.72c-1.93,3.34-.49,8.26,1.36,10.97.92,1.32,2.01,2.80,3.42,2.75,1.38-.05,1.90-.88,3.57-.88,1.65,0,2.14.88,3.59.85,1.48-.02,2.42-1.33,3.32-2.66A10.96,10.96,0,0,0,27.69,24.69,4.78,4.78,0,0,1,24.77,20.30Z" style="fill: #fff"/><path d="M22.04,12.21a4.87,4.87,0,0,0,1.11-3.49,4.95,4.95,0,0,0-3.20,1.65,4.63,4.63,0,0,0-1.14,3.36A4.09,4.09,0,0,0,22.04,12.21Z" style="fill: #fff"/><path d="M35.65,14.70V9.57h-1.87V8.73h4.67v.84H36.58v5.12Z" style="fill: #fff"/><path d="M42.76,13.48a1.82,1.82,0,0,1-1.95,1.30,2.04,2.04,0,0,1-2.08-2.32,2.07,2.07,0,0,1,2.07-2.35c1.25,0,2.00.85,2.00,2.27v.31H39.63v.04a1.19,1.19,0,0,0,1.19,1.29,1.07,1.07,0,0,0,1.07-.54Zm-3.12-1.45H41.91a1.08,1.08,0,0,0-1.10-1.16A1.15,1.15,0,0,0,39.63,12.03ZM40.27,9.44l1.03-1.42h1.04L41.19,9.44Z" style="fill: #fff"/><path d="M44.05,8.44h.88v6.26h-.88Z" style="fill: #fff"/><path d="M50.20,13.48a1.82,1.82,0,0,1-1.95,1.30,2.04,2.04,0,0,1-2.08-2.32,2.07,2.07,0,0,1,2.07-2.35c1.25,0,2.00.85,2.00,2.27v.31H47.08v.04a1.19,1.19,0,0,0,1.19,1.29,1.07,1.07,0,0,0,1.07-.54Zm-3.12-1.45h2.27a1.08,1.08,0,0,0-1.10-1.16A1.15,1.15,0,0,0,47.08,12.03Zm.63-2.58,1.03-1.42h1.04L48.63,9.44Z" style="fill: #fff"/><path d="M54.40,11.67a1.00,1.00,0,0,0-1.06-.76c-.74,0-1.19.57-1.19,1.52,0,.97.45,1.55,1.19,1.55a.97.97,0,0,0,1.06-.74h.86a1.76,1.76,0,0,1-1.92,1.53,2.06,2.06,0,0,1-2.11-2.35,2.05,2.05,0,0,1,2.10-2.32,1.77,1.77,0,0,1,1.92,1.55Z" style="fill: #fff"/><path d="M56.44,8.44h.88v2.48h.07a1.38,1.38,0,0,1,1.37-.80,1.48,1.48,0,0,1,1.55,1.67v2.90h-.88v-2.68c0-.71-.33-1.08-.96-1.08a1.05,1.05,0,0,0-1.13,1.14v2.62h-.88Z" style="fill: #fff"/><path d="M61.43,13.42c0-.81.60-1.27,1.67-1.34l1.21-.07V11.62c0-.47-.31-.74-.92-.74-.49,0-.83.18-.93.50h-.86c.09-.77.81-1.26,1.83-1.26,1.12,0,1.76.56,1.76,1.51v3.07h-.85v-.63H64.29a1.51,1.51,0,0,1-1.35.70A1.36,1.36,0,0,1,61.43,13.42Zm2.89-.38V12.66l-1.09.07c-.62.04-.90.25-.90.64,0,.40.35.64.83.64A1.06,1.06,0,0,0,64.33,13.04Z" style="fill: #fff"/><path d="M66.60,10.19h.85v.69h.06a1.22,1.22,0,0,1,1.21-.76,1.86,1.86,0,0,1,.39.03v.87a2.43,2.43,0,0,0-.49-.05A1.05,1.05,0,0,0,67.49,12.04v2.65h-.88Z" style="fill: #fff"/><path d="M69.96,15.15h.90c.07.32.45.53,1.05.53.74,0,1.17-.35,1.17-.94v-.86H73.03a1.51,1.51,0,0,1-1.38.75c-1.14,0-1.86-.88-1.86-2.23,0-1.37.71-2.27,1.86-2.27a1.56,1.56,0,0,1,1.41.79h.07v-.71h.85v4.54c0,1.02-.80,1.68-2.08,1.68C70.78,16.42,70.05,15.91,69.96,15.15Zm3.15-2.75c0-.89-.46-1.47-1.22-1.47-.76,0-1.19.57-1.19,1.47,0,.89.42,1.47,1.19,1.47C72.65,13.86,73.11,13.29,73.11,12.39Z" style="fill: #fff"/><path d="M79.21,13.48a1.82,1.82,0,0,1-1.95,1.30,2.04,2.04,0,0,1-2.08-2.32,2.07,2.07,0,0,1,2.07-2.35c1.25,0,2.00.85,2.00,2.27v.31H76.08v.04a1.19,1.19,0,0,0,1.19,1.29,1.07,1.07,0,0,0,1.07-.54Zm-3.12-1.45h2.27a1.08,1.08,0,0,0-1.10-1.16A1.15,1.15,0,0,0,76.08,12.03Z" style="fill: #fff"/><path d="M80.45,10.19H81.31v.69h.06a1.22,1.22,0,0,1,1.21-.76,1.86,1.86,0,0,1,.39.03v.87a2.43,2.43,0,0,0-.49-.05A1.05,1.05,0,0,0,81.34,12.04v2.65h-.88Z" style="fill: #fff"/><path d="M86.19,12.44c0-1.42.73-2.32,1.86-2.32a1.48,1.48,0,0,1,1.38.79h.06V8.44h.88v6.26h-.85v-.71H89.47a1.56,1.56,0,0,1-1.41.78C86.91,14.77,86.19,13.87,86.19,12.44Zm.91,0c0,.95.45,1.52,1.20,1.52.74,0,1.21-.58,1.21-1.52,0-.93-.46-1.52-1.21-1.52C87.56,10.92,87.11,11.50,87.11,12.44Z" style="fill: #fff"/><path d="M91.60,13.42c0-.81.60-1.27,1.67-1.34l1.21-.07V11.62c0-.47-.31-.74-.92-.74-.49,0-.83.18-.93.50h-.86c.09-.77.81-1.26,1.83-1.26,1.12,0,1.76.56,1.76,1.51v3.07h-.85v-.63h-.07a1.51,1.51,0,0,1-1.35.70A1.36,1.36,0,0,1,91.60,13.42Zm2.89-.38V12.66L93.39,12.73c-.62.04-.90.25-.90.64,0,.40.35.64.83.64A1.06,1.06,0,0,0,94.49,13.04Z" style="fill: #fff"/><path d="M96.77,10.19h.85v.71h.06a1.34,1.34,0,0,1,1.34-.80,1.46,1.46,0,0,1,1.55,1.67v2.91h-.88V12.00c0-.72-.31-1.08-.97-1.08a1.03,1.03,0,0,0-1.07,1.14v2.63H96.77Z" style="fill: #fff"/><path d="M103.61,10.11c1.01,0,1.67.47,1.76,1.26h-.85c-.08-.33-.40-.54-.90-.54-.49,0-.87.23-.87.58,0,.26.22.43.71.55l.74.17c.85.19,1.25.56,1.25,1.22,0,.84-.79,1.41-1.86,1.41-1.07,0-1.76-.48-1.84-1.28h.88a.91.91,0,0,0,.97.56c.55,0,.94-.24.94-.60,0-.26-.21-.44-.66-.54l-.78-.18c-.85-.20-1.25-.58-1.25-1.25C101.86,10.67,102.60,10.11,103.61,10.11Z" style="fill: #fff"/><path d="M35.19,18.06h1.85V30.48H35.19Z" style="fill: #fff"/><path d="M39.29,22.61l1.01-4.54h1.80l-1.23,4.54Z" style="fill: #fff"/><path d="M49.14,27.12H44.41l-1.13,3.35H41.27l4.48-12.41h2.08l4.48,12.41H50.28Zm-4.24-1.54h3.75l-1.84-5.44h-.05Z" style="fill: #fff"/><path d="M62.00,25.95c0,2.81-1.50,4.62-3.77,4.62a3.06,3.06,0,0,1-2.84-1.58h-.04v4.48h-1.85V21.43h1.79V22.93h.03a3.21,3.21,0,0,1,2.88-1.60C60.48,21.33,62.00,23.15,62.00,25.95Zm-1.91,0c0-1.83-.94-3.03-2.39-3.03-1.41,0-2.37,1.23-2.37,3.03,0,1.82.95,3.04,2.37,3.04C59.14,29.00,60.09,27.80,60.09,25.95Z" style="fill: #fff"/><path d="M71.96,25.95c0,2.81-1.50,4.62-3.77,4.62a3.06,3.06,0,0,1-2.84-1.58h-.04v4.48H63.43V21.43H65.23V22.93H65.27a3.21,3.21,0,0,1,2.88-1.60C70.45,21.33,71.96,23.15,71.96,25.95Zm-1.91,0c0-1.83-.94-3.03-2.39-3.03-1.41,0-2.37,1.23-2.37,3.03,0,1.82.95,3.04,2.37,3.04C69.10,29.00,70.05,27.80,70.05,25.95Z" style="fill: #fff"/><path d="M78.55,27.02c.13,1.23,1.33,2.04,2.96,2.04,1.56,0,2.69-.80,2.69-1.91,0-.96-.67-1.54-2.28-1.93l-1.60-.38C78.03,24.27,76.97,23.20,76.97,21.47c0-2.14,1.86-3.61,4.51-3.61,2.62,0,4.42,1.47,4.48,3.61H84.10c-.11-1.23-1.13-1.98-2.63-1.98s-2.52.75-2.52,1.85c0,.87.65,1.39,2.25,1.79l1.36.33c2.54.60,3.60,1.62,3.60,3.44,0,2.32-1.85,3.77-4.79,3.77-2.75,0-4.61-1.42-4.73-3.66Z" style="fill: #fff"/><path d="M90.19,19.28v2.14h1.72v1.47H90.19v4.99c0,.77.34,1.13,1.10,1.13a5.80,5.80,0,0,0,.61-.04v1.46a5.10,5.10,0,0,1-1.03.08c-1.83,0-2.54-.68-2.54-2.44V22.90H87.00V21.43h1.31V19.28Z" style="fill: #fff"/><path d="M92.90,25.95c0-2.84,1.67-4.63,4.29-4.63,2.62,0,4.29,1.79,4.29,4.63,0,2.85-1.66,4.63-4.29,4.63C94.56,30.59,92.90,28.81,92.90,25.95Zm6.69,0c0-1.95-.89-3.10-2.40-3.10s-2.40,1.16-2.40,3.10c0,1.96.89,3.10,2.40,3.10S99.60,27.92,99.60,25.95Z" style="fill: #fff"/><path d="M103.02,21.43h1.77v1.54h.04a2.15,2.15,0,0,1,2.17-1.63,2.86,2.86,0,0,1,.63.06V23.14a2.59,2.59,0,0,0-.83-.11,1.87,1.87,0,0,0-1.93,2.08v5.37h-1.85Z" style="fill: #fff"/><path d="M116.22,27.82c-.25,1.64-1.85,2.77-3.89,2.77-2.63,0-4.26-1.76-4.26-4.59,0-2.84,1.64-4.68,4.19-4.68,2.50,0,4.08,1.72,4.08,4.46v.63h-6.39v.11a2.35,2.35,0,0,0,2.43,2.56,2.04,2.04,0,0,0,2.09-1.27ZM109.94,25.12h4.52a2.17,2.17,0,0,0-2.22-2.29A2.29,2.29,0,0,0,109.94,25.12Z" style="fill: #fff"/></svg>
    `
  
  return `
    <svg class="btu-store-apple" width="145" height="47.2" viewBox="0 0 119.66 40"><path d="M110.13,0H9.53c-.36,0-.72,0-1.09.00-.30.00-.60.00-.91.01A13.21,13.21,0,0,0,5.51.19a6.66,6.66,0,0,0-1.90.62A6.43,6.43,0,0,0,1.99,1.99,6.25,6.25,0,0,0,.81,3.61a6.60,6.60,0,0,0-.62,1.90,12.99,12.99,0,0,0-.17,2.00C.00,7.83.00,8.13,0,8.44V31.55c.00.31.00.61.01.92a12.99,12.99,0,0,0,.17,2.00,6.58,6.58,0,0,0,.62,1.90A6.20,6.20,0,0,0,1.99,38.00a6.27,6.27,0,0,0,1.61,1.17,6.70,6.70,0,0,0,1.90.63,13.45,13.45,0,0,0,2.00.17c.30.00.61.01.91.01C8.80,40,9.16,40,9.53,40H110.13c.35,0,.72,0,1.08-.00.30,0,.61-.00.92-.01a13.27,13.27,0,0,0,2-.17,6.80,6.80,0,0,0,1.90-.63,6.27,6.27,0,0,0,1.61-1.17,6.39,6.39,0,0,0,1.18-1.61,6.60,6.60,0,0,0,.61-1.90,13.50,13.50,0,0,0,.18-2.00c.00-.31.00-.61.00-.92.00-.36.00-.72.00-1.09V9.53c0-.36,0-.72-.00-1.09,0-.30,0-.61-.00-.92a13.50,13.50,0,0,0-.18-2.00,6.61,6.61,0,0,0-.61-1.90,6.46,6.46,0,0,0-2.79-2.79,6.76,6.76,0,0,0-1.90-.62,13.04,13.04,0,0,0-2-.17c-.30-.00-.61-.01-.92-.01-.35-.00-.72-.00-1.08-.00Z" style="fill: #a6a6a6"/><path d="M8.44,39.12c-.30,0-.60-.00-.90-.01a12.68,12.68,0,0,1-1.86-.16,5.88,5.88,0,0,1-1.65-.54,5.40,5.40,0,0,1-1.39-1.01,5.32,5.32,0,0,1-1.02-1.39,5.72,5.72,0,0,1-.54-1.65,12.41,12.41,0,0,1-.16-1.87c-.00-.21-.01-.91-.01-.91V8.44S.88,7.75.88,7.54a12.37,12.37,0,0,1,.16-1.87,5.75,5.75,0,0,1,.54-1.66A5.37,5.37,0,0,1,2.61,2.61,5.56,5.56,0,0,1,4.01,1.59a5.82,5.82,0,0,1,1.65-.54A12.58,12.58,0,0,1,7.54.88L8.44.87H111.21l.91.01a12.38,12.38,0,0,1,1.85.16,5.93,5.93,0,0,1,1.67.54,5.59,5.59,0,0,1,2.41,2.41,5.76,5.76,0,0,1,.53,1.64,12.99,12.99,0,0,1,.17,1.88c.00.28.00.58.00.89.00.37.00.73.00,1.09V30.46c0,.36,0,.71-.00,1.07,0,.32,0,.62-.00.92a12.73,12.73,0,0,1-.17,1.85,5.73,5.73,0,0,1-.54,1.67,5.48,5.48,0,0,1-1.01,1.38,5.41,5.41,0,0,1-1.39,1.02,5.86,5.86,0,0,1-1.66.54,12.54,12.54,0,0,1-1.86.16c-.29.00-.59.01-.89.01l-1.08.00Z"/><path d="M24.76,20.30a4.94,4.94,0,0,1,2.35-4.15,5.06,5.06,0,0,0-3.99-2.15c-1.67-.17-3.30,1.00-4.16,1.00-.87,0-2.18-.98-3.60-.95a5.31,5.31,0,0,0-4.47,2.72c-1.93,3.34-.49,8.26,1.36,10.97.92,1.32,2.01,2.80,3.42,2.75,1.38-.05,1.90-.88,3.57-.88,1.65,0,2.14.88,3.59.85,1.48-.02,2.42-1.33,3.32-2.66a10.96,10.96,0,0,0,1.51-3.09A4.78,4.78,0,0,1,24.76,20.30Z" style="fill: #fff"/><path d="M22.03,12.21a4.87,4.87,0,0,0,1.11-3.49,4.95,4.95,0,0,0-3.20,1.65,4.63,4.63,0,0,0-1.14,3.36A4.09,4.09,0,0,0,22.03,12.21Z" style="fill: #fff"/><path d="M42.30,27.13h-4.73l-1.13,3.35H34.42l4.48-12.41h2.08l4.48,12.41H43.43ZM38.05,25.59h3.75l-1.84-5.44h-.05Z" style="fill: #fff"/><path d="M55.15,25.96c0,2.81-1.50,4.62-3.77,4.62a3.06,3.06,0,0,1-2.84-1.58h-.04v4.48h-1.85V21.44H48.43v1.50h.03a3.21,3.21,0,0,1,2.88-1.60C53.64,21.34,55.15,23.16,55.15,25.96Zm-1.91,0c0-1.83-.94-3.03-2.39-3.03-1.41,0-2.37,1.23-2.37,3.03,0,1.82.95,3.04,2.37,3.04C52.30,29.01,53.24,27.81,53.24,25.96Z" style="fill: #fff"/><path d="M65.12,25.96c0,2.81-1.50,4.62-3.77,4.62a3.06,3.06,0,0,1-2.84-1.58h-.04v4.48h-1.85V21.44H58.39v1.50h.03A3.21,3.21,0,0,1,61.31,21.34C63.60,21.34,65.12,23.16,65.12,25.96Zm-1.91,0c0-1.83-.94-3.03-2.39-3.03-1.41,0-2.37,1.23-2.37,3.03,0,1.82.95,3.04,2.37,3.04C62.26,29.01,63.21,27.81,63.21,25.96Z" style="fill: #fff"/><path d="M71.71,27.03c.13,1.23,1.33,2.04,2.96,2.04,1.56,0,2.69-.80,2.69-1.91,0-.96-.67-1.54-2.28-1.93l-1.60-.38c-2.28-.55-3.33-1.61-3.33-3.34,0-2.14,1.86-3.61,4.51-3.61,2.62,0,4.42,1.47,4.48,3.61h-1.87c-.11-1.23-1.13-1.98-2.63-1.98s-2.52.75-2.52,1.85c0,.87.65,1.39,2.25,1.79l1.36.33c2.54.60,3.60,1.62,3.60,3.44,0,2.32-1.85,3.77-4.79,3.77-2.75,0-4.61-1.42-4.73-3.66Z" style="fill: #fff"/><path d="M83.34,19.29v2.14h1.72v1.47H83.34v4.99c0,.77.34,1.13,1.10,1.13a5.80,5.80,0,0,0,.61-.04v1.46a5.10,5.10,0,0,1-1.03.08c-1.83,0-2.54-.68-2.54-2.44V22.91H80.16V21.44H81.47V19.29Z" style="fill: #fff"/><path d="M86.06,25.96c0-2.84,1.67-4.63,4.29-4.63,2.62,0,4.29,1.79,4.29,4.63,0,2.85-1.66,4.63-4.29,4.63C87.72,30.60,86.06,28.82,86.06,25.96Zm6.69,0c0-1.95-.89-3.10-2.40-3.10s-2.40,1.16-2.40,3.10c0,1.96.89,3.10,2.40,3.10S92.76,27.93,92.76,25.96Z" style="fill: #fff"/><path d="M96.18,21.44h1.77v1.54h.04a2.15,2.15,0,0,1,2.17-1.63,2.86,2.86,0,0,1,.63.06v1.73a2.59,2.59,0,0,0-.83-.11,1.87,1.87,0,0,0-1.93,2.08v5.37h-1.85Z" style="fill: #fff"/><path d="M109.38,27.83c-.25,1.64-1.85,2.77-3.89,2.77-2.63,0-4.26-1.76-4.26-4.59,0-2.83,1.64-4.68,4.19-4.68,2.50,0,4.08,1.72,4.08,4.46v.63h-6.39v.11a2.35,2.35,0,0,0,2.43,2.56,2.04,2.04,0,0,0,2.09-1.27Zm-6.28-2.70h4.52a2.17,2.17,0,0,0-2.22-2.29A2.29,2.29,0,0,0,103.10,25.13Z" style="fill: #fff"/><path d="M37.82,8.73a2.63,2.63,0,0,1,2.80,2.96c0,1.90-1.03,3.00-2.80,3.00H35.67V8.73Zm-1.22,5.12h1.12a1.87,1.87,0,0,0,1.96-2.14,1.88,1.88,0,0,0-1.96-2.13h-1.12Z" style="fill: #fff"/><path d="M41.68,12.44a2.13,2.13,0,1,1,4.24,0,2.13,2.13,0,1,1-4.24,0Zm3.33,0c0-.97-.43-1.54-1.20-1.54-.77,0-1.20.57-1.20,1.54,0,.98.43,1.55,1.20,1.55C44.57,13.99,45.01,13.42,45.01,12.44Z" style="fill: #fff"/><path d="M51.57,14.69h-.92l-.93-3.31h-.07l-.92,3.31h-.91l-1.24-4.50h.90l.80,3.43h.06l.92-3.43h.85l.92,3.43h.07l.80-3.43h.88Z" style="fill: #fff"/><path d="M53.85,10.19H54.70v.71h.06a1.34,1.34,0,0,1,1.34-.80,1.46,1.46,0,0,1,1.55,1.67v2.91h-.88V12.00c0-.72-.31-1.08-.97-1.08a1.03,1.03,0,0,0-1.07,1.14v2.63h-.88Z" style="fill: #fff"/><path d="M59.09,8.43h.88v6.26h-.88Z" style="fill: #fff"/><path d="M61.21,12.44a2.13,2.13,0,1,1,4.24,0,2.13,2.13,0,1,1-4.24,0Zm3.33,0c0-.97-.43-1.54-1.20-1.54-.77,0-1.20.57-1.20,1.54,0,.98.43,1.55,1.20,1.55C64.11,13.99,64.55,13.42,64.55,12.44Z" style="fill: #fff"/><path d="M66.40,13.42c0-.81.60-1.27,1.67-1.34l1.21-.07v-.38c0-.47-.31-.74-.92-.74-.49,0-.83.18-.93.50h-.86c.09-.77.81-1.26,1.83-1.26,1.12,0,1.76.56,1.76,1.51v3.07h-.85v-.63h-.07a1.51,1.51,0,0,1-1.35.70A1.36,1.36,0,0,1,66.40,13.42Zm2.89-.38v-.37l-1.09.07c-.62.04-.90.25-.90.64,0,.40.35.64.83.64A1.06,1.06,0,0,0,69.29,13.03Z" style="fill: #fff"/><path d="M71.34,12.44c0-1.42.73-2.32,1.86-2.32a1.48,1.48,0,0,1,1.38.79h.06V8.43h.88v6.26h-.85v-.71h-.07a1.56,1.56,0,0,1-1.41.78C72.07,14.77,71.34,13.87,71.34,12.44Zm.91,0c0,.95.45,1.52,1.20,1.52.74,0,1.21-.58,1.21-1.52,0-.93-.46-1.52-1.21-1.52C72.72,10.91,72.26,11.49,72.26,12.44Z" style="fill: #fff"/><path d="M79.23,12.44a2.13,2.13,0,1,1,4.24,0,2.13,2.13,0,1,1-4.24,0Zm3.33,0c0-.97-.43-1.54-1.20-1.54-.77,0-1.20.57-1.20,1.54,0,.98.43,1.55,1.20,1.55C82.12,13.99,82.56,13.42,82.56,12.44Z" style="fill: #fff"/><path d="M84.66,10.19h.85v.71h.06a1.34,1.34,0,0,1,1.34-.80,1.46,1.46,0,0,1,1.55,1.67v2.91H87.60V12.00c0-.72-.31-1.08-.97-1.08a1.03,1.03,0,0,0-1.07,1.14v2.63h-.88Z" style="fill: #fff"/><path d="M93.51,9.07v1.14h.97v.74h-.97V13.27c0,.47.19.67.63.67a2.96,2.96,0,0,0,.33-.02v.74a2.91,2.91,0,0,1-.48.04c-.98,0-1.38-.34-1.38-1.21v-2.54h-.71v-.74h.71V9.07Z" style="fill: #fff"/><path d="M95.70,8.43h.88v2.48h.07a1.38,1.38,0,0,1,1.37-.80,1.48,1.48,0,0,1,1.55,1.67v2.90H98.69v-2.68c0-.71-.33-1.08-.96-1.08a1.05,1.05,0,0,0-1.13,1.14v2.62h-.88Z" style="fill: #fff"/><path d="M104.76,13.48a1.82,1.82,0,0,1-1.95,1.30A2.04,2.04,0,0,1,100.73,12.46a2.07,2.07,0,0,1,2.07-2.35c1.25,0,2.00.85,2.00,2.27V12.68h-3.17v.04a1.19,1.19,0,0,0,1.19,1.29,1.07,1.07,0,0,0,1.07-.54Zm-3.12-1.45h2.27a1.08,1.08,0,0,0-1.10-1.16A1.15,1.15,0,0,0,101.63,12.03Z" style="fill: #fff"/></svg>
  `
}

// Popup si on a appuyé sur "créer un wallet" en étant sur dekstop
const _btu_templateModalDownloadContent = () => {
  return {
    top:`
      <a id="btu-arrow">
        <img id='btu-prev' src=${_btu_icons.arrow}><img>
      </a>
      <h1>${_btu_translate("isDownload.download")}</h1>
      <p>${_btu_translate("isDownload.download_bis")}</p>
    `,
    bottom: `
      <div id="btu-modal-content-inner">
        <div id="btu-modal-content-download">
          <img src=${_btu_icons.qrcode} width="173px" height="173px" style="margin: 0 auto"></img>
          <div id="btu-separator">
            <span>${_btu_translate("isDownload.other")}</span>
          </div>
          <div id="btu-store">
            <a>
              <div id="btu-google" class="btu-store-google">
                ${_btu_googlePlay()}
              </div>
            </a>
            <a id="btu-apple">
              ${_btu_appleStore()}
            </a>
          </div>
        </div>
      </div>
    `,
  }
}

// Popup si on a appuyé sur "J'ai déjà un wallet" ou "Changer de wallet"
const _btu_templateModalTypeContent = () => {
  return {
    top: `
      <a id="btu-arrow">
        <img id='btu-prev' src=${_btu_icons.arrow}><img>
      </a>
      ${_btu_translate("inputWallet.howTo")}
    `,
    bottom: `
      <div id="btu-modal-content-inner">
        <label id="btu-input-title" for="btu-wallet-input">${_btu_translate("inputWallet.addrBTU")}</label>
        <input id="btu-wallet-input" data-btu-type='btu-input' placeholder="0x..." />
        <p id='btu-error'></p>
        <div id='btu-wallet-type' class='btu-btn-blue'>
          <button>
            ${_btu_translate("inputWallet.inputCo").toUpperCase()}
          </button>
        </div>
      </div>
    </div>
    `,
  }
}

// Popup Wallet Connect
const _btu_templateModalWalletConnect = () => {
  const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
  const eventer = window[eventMethod]
  const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"

  eventer(messageEvent,function(e) {
    if (e.data && e.data.type) {
      switch (e.data.type) {
        case 'connected':
          console.log('connected: ', e.data.account)
          sessionStorage.setItem("BTU-InputWallet", e.data.account)
			    _btu_inputWallet(e.data.account)
			    _btu_changeModal("done")
          break
        case 'already connected':
          console.log('already connected: ', e.data.account)
          sessionStorage.setItem("BTU-InputWallet", e.data.account)
			    _btu_inputWallet(e.data.account)
			    _btu_changeModal("done")
          break
        case 'no account':
          console.log('no account')
          break
        default:
      }
    }
  },false)

  return {
    top: `
      <a id="btu-arrow">
        <img id='btu-prev' src=${_btu_icons.arrow}><img>
      </a>
      ${_btu_translate("inputWallet.walletConnect")}
    `,
    bottom: `
      <div id="btu-modal-content-inner">
        <div id="btu-wallet-connect-container">
          <iframe id="btu-wallet-connect-iframe" src="${_btu_config.walletConnectUrl}" scrolling="no"></iframe>
        </div>
      </div>
    </div>
    `,
  }
}

// Popup affichant l'addresse wallet si connecté
const _btu_templateModalDoneContent = () => {
  return {
    top: `
      <h1>${_btu_translate("isConnected.nowCo")}</h1>
    `,
    bottom: `
      <div id="btu-modal-content-inner">
        <div id="btu-address-txt-title">${_btu_translate("isConnected.BTUAddr")}</div>
        <div id="btu-address-txt">${sessionStorage.getItem("BTU-walletAddr")}</div>
        <div id="btu-change-wallet" class="btu-btn-blue">
          <button>
            ${_btu_translate("isConnected.switchWallet").toUpperCase()}
          </button>
        </div>
      </div>
    `,
  }
}

// CSS
const _btu_cSS = `
#btu-modal-close {position: absolute; top: 0; right: 16px; z-index: 1;}
#btu-close { background: none; border: none; color: white; font-size: 26px; font-style: normal; font-weight: normal; padding: 0;}
#btu-modalOut {max-width: 100%; cursor: default; display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1400; background-color: rgba(0, 0, 0, 0.5); opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; box-sizing: border-box; font-family: "Poppins", sans-serif; padding: 20px;}
#btu-modalOut button { cursor: pointer;}
#btu-modalOut button:focus, #btu-modalOut input[type="text"]:focus { outline: 0; }
#btu-modalIn{position: absolute; top: 50%; left: 50%; height: 360px; width: calc(100% - 40px); max-width: 400px; max-height: 100%; background: #fafafa; box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12); border-radius: 10px; transform: translate(-50%, -50%); border: none; padding: 0; margin: 0;}
#btu-modal-text { color: white; background-color: #4B82ED;  display: flex;  flex-direction: column; align-items: center;  justify-content: center; height: 120px;  border-top-left-radius: 10px;  border-top-right-radius: 10px;  position: relative;  overflow: hidden; clip-path: url("#btu-modal-text-clip"); -webkit-clip-path: url("#btu-modal-text-clip"); text-align: center;}
#btu-modal-text-back { position: absolute; top: 50px; left: 0; width: 100%; height: 70px; background: #dbe6fb; clip-path: url("#btu-modal-text-back-clip");  -webkit-clip-path: url("#btu-modal-text-back-clip")}
#btu-modal-text h1 {font-family: "Roboto", sans-serif; font-style: normal; font-weight: normal; font-size: 18px; line-height: 21px; margin: 0; text-align: center;}
#btu-modal-text > p { margin: 0; font-style: normal; font-weight: normal; font-size: 14px; line-height: 16px; text-align: center;}
#btu-modal-action { background-color: #fafafa; display: flex; align-items: center; padding: 0 20px; height: calc(100% - 150px); overflow: auto;}
#btu-modal-content-inner {margin: auto; text-align: center; padding: 10px 0; width: 100%;}
#btu-modal-content-download { display: flex}
#btu-modal-content-download > div { flex: 1;}
#btu-modal-footer { width: 100%; height: 30px; display: flex; justify-content: flex-end; align-items: center; font-size: 10px; background-color: #fafafa; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;}
#btu-modal-footer > a { padding-right: 15px; color: #797979; text-decoration: none;}
#btu-modalBtn {color: white; cursor: pointer; font-size: 25px; height: 16px; width: 18px; box-sizing: border-box; text-align: center; fill: white;}
.btu-btn-link {border: none; background: none; color: #4B82ED; font-style: normal; font-weight: normal; font-size: 12px; text-decoration-line: underline;}
#btu-placeholder {max-width: calc(100%); width: 100%; height: 24px; display: flex; background-color: #303030; justify-content: space-between; color: white; padding-left: 15px; padding-right: 15px; box-sizing: border-box;}
#btu-conStatus {display: flex; align-items: center; cursor: pointer; font-family: Lato; font-size: 13px;}
#btu-openModal {display: flex; align-items: center; cursor: pointer;}
#btu-walletSpan {display: inline-block; margin-right: 4px; }
.btu-barButton {font-family: Lato; font-size: 13px; font-weight: 400; line-height:13px; }
#btu-statusLed {color: rgb(227, 70, 82); font-size: 24px; height: 12px; } #btu-statusLedIn {fill: rgb(227, 70, 82); color: rgb(227, 70, 82); font-size: 24px;}
#btu-input-title { display: block; color: #504F60; font-size: 16px; line-height: 24px; text-transform: uppercase; margin-bottom: 10px;}
#btu-wallet-input { width: calc(100% - 20px); height: 45px; border: 1px solid #4B82ED; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); border-radius: 35px; margin-bottom: 20px; padding: 0 20px; background-color: transparent; color: black;}
#btu-wallet-input:focus { outline:0; }
#btu-address-txt-title {color: #6e6e6e; font-size: 21px;}
#btu-address-txt {margin: 0; color: #6e6e6e; font-size: 15px; text-align: center; padding-bottom: 20px; word-break: break-word;}
#btu-error { color: #e34652; margin: 0 auto;}
#btu-provider-img {padding-right: 5px; width: 22px; height: 16px;}
#btu-arrow {cursor: pointer; z-index: 1; left: 15px; top: 12px; position: absolute;}
.btu-btn-confirm button{text-transform: uppercase;}
#btu-store, #btu-separator { display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;}
#btu-separator > span { background-color: #fafafa; color: #4B82ED; text-transform: uppercase; border: 1px solid #4B82ED; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; z-index: 1;}
#btu-separator:after { content: ""; position: absolute; top: 0; left: 50%; width: 1px; height: 100%; background: #4B82ED; transform: translate(-50%, 0);}
.btu-store-apple {cursor: pointer;margin: 5px 0;}
.btu-store-google {cursor: pointer; width: 160px;}
.btu-btn-blue {margin-bottom: 20px;}
.btu-btn-blue button {background-color: #4B82ED; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); border-radius: 35px; padding: 15px 40px; border: none; color: white; font-size: 15px; font-style: normal; font-weight: normal; text-decoration-line: none;}
.btu-btn-white {background: white !important; color: #4b82ed; !important; text-decoration: underline; width: 113%; margin-left: -4%;} .btu-btn-white:hover {text-decoration: none; background-color: rgba(0, 0, 0, 0.08);}
.btu-btn-close {width: 30px; height: 30px; right: 0px; top: -7px; position: absolute;}
.btu-btn-error { border: 1px solid #e34652 !important; margin-bottom: 5px !important;}
.btu-create-list { margin-left:-20px; margin-right: -20px; border-bottom: 1px solid rgba(22,28,45,.125); }
.btu-create-list-btn { display: flex; align-items: center; background: none; border: none; width: 100%; min-height: 46px; padding: 10px 20px; font-size:14px; color:black;}
.btu-create-list-btn > span { text-align: left; }
.btu-create-list-image { display: flex; justify-content: center; align-items: center; width: 36px; margin-right:10px; }
#btu-wallet-connect-container { width: 150px; height: 150px; box-sizing: border-box; margin: 0 auto; }
#btu-wallet-connect-iframe { width: 100%; height: 100%; border: none; margin: 0; padding: 0; overflow: hidden; }
@media screen and (min-width: 600px) {
	#btu-modal-action::-webkit-scrollbar { width: 5px; }
	#btu-modal-action::-webkit-scrollbar-track {background: white;}
	#btu-modal-action::-webkit-scrollbar-thumb {background: #e0e0e0; border-radius: 2px;}
	#btu-modal-action::-webkit-scrollbar-thumb:hover {background: #a0a0a0;}
}
@media screen and (max-width: 450px) {
	#btu-modal-content-download {  flex-direction: column; }
	#btu-separator { margin-bottom: 20px; }
	#btu-separator:after {  content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #4B82ED; transform: translate(0, -50%);}
}
@media screen and (max-width: 340px) { .btu-btn-blue button { padding: 10px 40px;} }
@media screen and (max-width: 1024px) { #btu-address-txt {overflow-x: auto; word-break: break-all;} }
`
/**
 * Fonction principale
 *
 * @param {bool} initTimer - true s'il faut également initialiser le timer d'ouverture de popup
 */
function _btu_loadDappbar(initTimer = false) {
  if (jQuery_btu(`#${_btu_config.placeholderTag}`).length === 0) {
	  console.log(_btu_translate("placeholderMissing"))
	  return
  }
  
  _btu_config.walletinput = sessionStorage.getItem("BTU-InputWallet")

	const debug = _btu_getParameter("debug") ? true : false

	let style = document.createElement('style')
	style.type='text/css'
	if (style.styleSheet) {
    style.styleSheet.cssText = BTUstyle
	} else {
    style.appendChild(document.createTextNode(_btu_cSS))
	}

	document.getElementsByTagName('head')[0].appendChild(style)
	let link = document.createElement('link')
	link.rel = "stylesheet"
	link.href = "https://fonts.googleapis.com/css?family=Poppins&display=swap"
	document.getElementsByTagName('head')[0].appendChild(link)
	link = document.createElement('link')
	link.rel = "stylesheet"
	link.href = "https://fonts.googleapis.com/css?family=Lato&display=swap"
	document.getElementsByTagName('head')[0].appendChild(link)

	sessionStorage.setItem('BTU-walletAddr', _btu_config.defaultWallet)
	sessionStorage.setItem("BTU-walletConnected", false)

  let restrictDomain = jQuery_btu(`#${_btu_config.placeholderTag}`).data("restrict-domain")
  const noPopupData = jQuery_btu(`#${_btu_config.placeholderTag}`).data("no-popup")
  _btu_noPopup = (typeof noPopupData !== "undefined" && noPopupData === true)

	if (restrictDomain) {
	  restrictDomain = restrictDomain.split(",")
	  if (restrictDomain.length === 1)
			restrictDomain = restrictDomain[0]
	}

  //Va dans cette fonction si on trouve un navigateur qui possède un wallet
  const onAccountGet = (err, res) => {
    if (err) {
      console.log("BTU Dappbar Error getting ETH account:\n", err)
    } else {
      _btu_inputWallet(res[0])
    }
  }

  if (restrictDomain === undefined
    || (typeof restrictDomain === "string" && restrictDomain === window.location.hostname)
    || (Array.isArray(restrictDomain) && restrictDomain.includes(window.location.hostname))) {
    // La dappbar est autorisée sur ce site
    jQuery_btu(document).ready(async () => {
      // Sauvegarde de l'état de la dappbar
      sessionStorage.setItem('BTU-dappbarEnabled', true)

      // Création d'un événement indiquant que la dappbar est autorisée
      let btuDappbarEnabledEvent = document.createEvent('Event')
      btuDappbarEnabledEvent.initEvent('BTU-dappbarEnabled', true, true)
      window.dispatchEvent(btuDappbarEnabledEvent)

      if (debug) {
        alert("document ready/" + window.location.hostname)
        alert((window.ethereum ? " detected wallet true" : "detected wallet false"))
      }
      if (_btu_config.walletinput) {
        _btu_openPopup = false
        _btu_inputWallet(_btu_config.walletinput)
      }
      if (window.ethereum) {
        if (debug)
          alert("detected ethereum wallet")
        window.web3 = new Web3(ethereum)
        try {
          if (debug)
            alert("Classic web3 wallet")
          await ethereum.enable()
          if (debug)
            alert("Connected")
          _btu_openPopup = false
          window.web3.eth.getAccounts(onAccountGet)
          // Création d'un événement indiquant qu'un wallet ethereum a été créé
          let btuDappbarEthereumEvent = document.createEvent('Event')
          btuDappbarEthereumEvent.initEvent('BTU-dappbarEthereum', true, true)
          window.dispatchEvent(btuDappbarEthereumEvent)
        }
        catch (error) {
          console.log("BTU Dappbar Error enabling ETH account:\n", error)
        }
      } else if (window.web3) {
        if (debug)
          alert("Simple web3 wallet")
        window.web3 = new Web3(web3.currentProvider)
        window.web3.eth.getAccounts(onAccountGet)
        // Création d'un événement indiquant qu'un wallet ethereum a été créé
        let btuDappbarEthereumEvent = document.createEvent('Event')
        btuDappbarEthereumEvent.initEvent('BTU-dappbarEthereum', true, true)
        window.dispatchEvent(btuDappbarEthereumEvent)
      } else {
        if (debug)
          alert("non ethereum browser")
        // console.log(_btu_translate("nonEthereumBrowser"));
      }
    })
  } else {
    // La dappbar n'est pas autorisée sur ce domaine

    // Sauvegarde du statut d'activation de la dappbar
    sessionStorage.setItem('BTU-dappbarEnabled', false)

    // Masquage de la dappbar
    let dappbarDiv = document.getElementById('btu-placeholder')
    if (dappbarDiv) {
      dappbarDiv.style.display = 'none'
    }

    if (debug) {
      alert("Not connecting")
    }
  }

  // Cherche le wallet dans l'url si il y a un restrict domain (mode non dapp)
	if (restrictDomain !== undefined
	  && (typeof restrictDomain == "string" && restrictDomain !== window.location.hostname
	  || (Array.isArray(restrictDomain) && !restrictDomain.includes(window.location.hostname)))) {
    _btu_openPopup = false
    const walletAddr = _btu_getParameter("w")
    const addresseBTU = sessionStorage.getItem("BTU-walletAddr")
    const pattern = new RegExp('^0[xX][0-9A-Fa-f]{40}$')
    if (walletAddr !== null && pattern.test(walletAddr) && addresseBTU !== walletAddr)
      _btu_inputWallet(walletAddr)
    else if (walletAddr === null || !pattern.test(walletAddr))
      sessionStorage.setItem('BTU-walletAddr', _btu_config.defaultWallet)
    return null
	} else {
	  jQuery_btu(`#${_btu_config.placeholderTag}`).html(_btu_templateDappbar() + _btu_templateModal())
    _btu_changeModal(_btu_config.currentModalType)
  }

  if (initTimer) {
    // Initialise le timer d'ouverture de popup
    _btu_openPopup = true
    _btu_initPopupTimer()
  } else {
    if (_btu_popupIsOpen === true) {
      _btu_changeModal(_btu_config.currentModalType)
      jQuery_btu("#btu-modalOut").show()
    }
  }
}

// Chargement de la dappbar à la création du document
/*
jQuery_btu(() => {
	_btu_loadDappbar(true);
});
*/

/**
 * Gestion des modals HTML
 */

// Cette variable est lue au bout de 2 secondes : si elle est toujours true, une popup est ouverte.
var _btu_openPopup = true

// true si popup actuellement ouverte, false sinon
var _btu_popupIsOpen = false

// Timer BTU
var _btu_popupTimer = null

// true s'il ne faut pas afficher la popup au démarrage
var _btu_noPopup = false

/**
 * Appel de la modal de création si l'utilisateur n'est pas connecté au bout de 2 secondes
 */
const _btu_initPopupTimer = () => {
  // Timer déjà lancé : on l'annule avant de le recréer
  if (_btu_popupTimer !== null) {
    clearInterval(_btu_popupTimer);
  }

  // Initialisation du timer
  _btu_popupTimer = setTimeout(() => {
    jQuery_btu(() => {
      if (_btu_openPopup === true && !_btu_noPopup) {
        _btu_popupIsOpen = true
        _btu_changeModal('create')
        jQuery_btu("#btu-modalOut").show()
      }
    })
  }, 2000);
}

const _btu_changeModal = (type) => {
  let next
  switch (type) {
    case "create":
      next = _btu_templateModalCreateContent()
      break
    case "type":
      next = _btu_templateModalTypeContent()
      break
    case "download":
      next = _btu_templateModalDownloadContent()
      break
    case "done":
      next = _btu_templateModalDoneContent()
      break
    case "walletConnect":
      next = _btu_templateModalWalletConnect()
      break
    default:
      return
  }

	jQuery_btu(`#btu-modal-text`).html(next.top)
  jQuery_btu(`#btu-modal-action`).html(next.bottom)
  
  _btu_config.currentModalType = type
}

/**
 * Appels à l'initialisation de jQuery
 */
const _btu_initJQuery = () => {
  // Refresh de la page si button back
  /*
  jQuery_btu(window).on('popstate', function() {
    location.reload(true);
  })
  */

  jQuery_btu(() => {
    // Chargement dapp bar
    _btu_loadDappbar(true);

    // Gestion des actions à la souris
    jQuery_btu(document).on("click", "#btu-openModal", () => {
      const connected = sessionStorage.getItem("BTU-walletConnected")
      if (connected === 'true')
        _btu_changeModal('done')
      else
        _btu_changeModal('create')
      //change content of div to create or logged depending on connected or not
      _btu_popupIsOpen = true
      jQuery_btu("#btu-modalOut").show()
    })

    jQuery_btu(document).on("click", "#btu-conStatus", () => {
      const connected = sessionStorage.getItem("BTU-walletConnected")
      if (connected === 'true')
        _btu_changeModal('done')
      else
        _btu_changeModal('create')
        _btu_popupIsOpen = true
      jQuery_btu("#btu-modalOut").show()
    })

    jQuery_btu(document).on("click", "#btu-modalIn", (e) => {
      e.stopPropagation()
    })

    jQuery_btu(document).on("click", "#btu-modalOut", (e) => {
      _btu_popupIsOpen = false
      jQuery_btu("#btu-modalOut").hide()
      e.stopPropagation()
    })

    jQuery_btu(document).on("click", "#btu-btn-create", () => {
      if (/Android/i.test(navigator.userAgent)) {
        window.open('https://play.google.com/store/apps/details?id=com.btu_direct.wallet', '_blank')
        _btu_popupIsOpen = false
        jQuery_btu("#btu-modalOut").hide()
      }
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.open('https://apps.apple.com/fr/app/btu-protocol/id1473117679', '_blank')
        _btu_popupIsOpen = false
        jQuery_btu("#btu-modalOut").hide()
      }
      else {
        _btu_config.page = 1
        _btu_changeModal("download")
      }
    })
    
    jQuery_btu(document).on("click", "#btu-btn-trust", () => {
      const url = window.location
      window.open('https://link.trustwallet.com/open_url?coin_id=60&url=' + url, '_blank')
      _btu_popupIsOpen = false
      jQuery_btu("#btu-modalOut").hide()
    })

    jQuery_btu(document).on("click", "#btu-btn-wallet-connect", () => {
      _btu_config.page = 1
      _btu_changeModal("walletConnect")
    })

    jQuery_btu(document).on("click", "#btu-btn-hasCreated", () => {
      window.reload()
    })

    jQuery_btu(document).on("click", "#btu-google", () => {
      window.open('https://play.google.com/store/apps/details?id=com.btu_direct.wallet', '_blank')
    })

    jQuery_btu(document).on("click", "#btu-apple", () => {
      window.open('https://apps.apple.com/fr/app/btu-protocol/id1473117679', '_blank')
    })

    jQuery_btu(document).on("click", "#btu-btn-has", () => {
      _btu_changeModal("type")
    })

    jQuery_btu(document).on("click", "#btu-wallet-type", () => {
      const enteredWallet = jQuery_btu("input[data-btu-type='btu-input']").val() //Could not get input value
      if (enteredWallet && /^0[xX][0-9A-Fa-f]{40}$/.test(enteredWallet)) {
        sessionStorage.setItem("BTU-InputWallet", enteredWallet)
        _btu_inputWallet(enteredWallet)
        _btu_changeModal("done")
      } else {
        jQuery_btu("#btu-wallet-input").css("border", "1.5px solid #e34652")
        if (enteredWallet && enteredWallet.length) {
          jQuery_btu("#btu-error").text(_btu_translate("inputWallet.invalidETH"))
        } else {
          jQuery_btu("#btu-error").text(_btu_translate("inputWallet.requiredETH"))
        }
      }
    })

    jQuery_btu(document).on("click", "#btu-prev", () => {
      if (_btu_config.page === 1)
        _btu_changeModal("create")
      if (_btu_config.page === 2)
        _btu_changeModal("done")
    })

    jQuery_btu(document).on("click", "#btu-change-wallet", () => {
      _btu_config.page = 2
      _btu_changeModal("type")
    })
    jQuery_btu(document).on("click", "#btu-close", () => {
      _btu_popupIsOpen = false
      jQuery_btu("#btu-modalOut").hide()
    })
  })
}

/**
 * Initialisation de jQuery
 */
(function(d, s, id){
  let jQueryOk = true
  if (!window.jQuery)
    jQueryOk = false
  else {
    const version = jQuery.fn.jquery
    if (version.split('.')[0] < 3)
      jQueryOk = false
  }

  if (jQueryOk) {
    jQuery_btu = $.noConflict(true)
    _btu_initJQuery()
  } else {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)){ return }
    js = d.createElement(s); js.id = id
    js.onload = function(){
      jQuery_btu = $.noConflict(true);
      _btu_initJQuery()
    }
    js.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    fjs.parentNode.insertBefore(js, fjs)
  }
}(document, 'script', 'jquery-dappbar'))
