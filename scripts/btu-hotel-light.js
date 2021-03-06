/******************************************************************************/
/*                                                                            */
/*                            BTU HOTEL LIGHT                                 */
/*                                                                            */
/******************************************************************************/

// Protection contre les conflits de version jQuery
var jQuery_btu = $.noConflict(true);

/**
 * Configuration
 */
const _btu_lightWidgetConfig = {
  supportedLanguages: ['fr'],
  defaultLanguage: 'fr',
  currentLanguage: null,
  placeholderTag: 'btu-hotel-container',
  url: {
    api: 'https://api.btu-direct.com/v1/hotel/search',
    hotelList: 'https://hotel.travel-everywhere.com/list/',
    hotelHotel: 'https://hotel.travel-everywhere.com/hotel/',
    fonts: 'https://fonts.googleapis.com/css?family=Poppins&display=swap',
  },
}

/**
 * Traductions
 */
const _btu_translations = {
  "fr": {
    "title": "Votre hôtel au meilleur prix",
    "subtitle": "La Vérité !",
    "placeholder": "Où partez-vous ?",
    "brand": "Travel Everywhere",
    "placeholderMissing": "Veuillez intégrer une balise <div id=\"btu-hotel-container\">.",
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
  if (_btu_lightWidgetConfig.currentLanguage === null) {
    _btu_initLanguage()
  }
  return _btu_lightWidgetConfig.currentLanguage	? _btu_lightWidgetConfig.currentLanguage : _btu_lightWidgetConfig.defaultLanguage
}

/**
 * Modifie la langue active
 *
 * @param {string} language - Code langue
 */
function _btu_setLanguage(language) {
  if (typeof language === 'string' && _btu_lightWidgetConfig.supportedLanguages.includes(language))
    _btu_lightWidgetConfig.currentLanguage = language
}

/**
 * Initialise la langue active
 */
const _btu_initLanguage = () => {
  _btu_setLanguage('fr')
}

/**
 * Récupère le parent d'un élément à partir de son id
 *
 * @param {Object} child - élément dont il faut trouver le parent
 * @param {string} id - id du parent
 * @returns {Object} élément parent, null ni non trouvé
 */
function _btu_findParentById(child, id) {
  do {
    if (child.id === id) return child
  } while (child = child && child.parentNode)
  return null
}

/**
 * Récupère le premier enfant d'un élément à partir de sa classe
 *
 * @param {Object} parent - élément dont il faut trouver l'enfant
 * @param {string} className - classe de l'enfant
 * @returns {Object} élément enfant, null ni non trouvé
 */
function _btu_findChildByClass(parent, className) {
  const children = parent.getElementsByClassName(className)
  if (children.length > 0)
    return children[0]
  else
    return null
}

/**
 * Retourne un texte dans la langue en cours
 *
 * @param {string} path - chemin du texte à traduite
 */
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

/**
 * Convertit un objet Date en chaîne de caractères YYYY-MM-DD
 *
 * @param {Date} date - date à convertir
 * @returns {string} date convertie au format YYYY-MM-DD
 */
function _btu_convertDateToString(date) {
  var dd = date.getDate()
  var mm = date.getMonth() + 1
  var yyyy = date.getFullYear()

  if (dd < 10)
    dd = '0' + dd
  if (mm < 10)
    mm = '0' + mm
  return yyyy + '-' + mm + '-' + dd
}

/**
 * Ouvre une url dans un nouvel onglet
 *
 * @param {string} url - url à ouvrir
 */
function _btu_openInNewTab(url) {
  const win = window.open(url, '_blank')
  win.focus()
}

/**
 * HTML
 */

const _btu_lightWidget = () => {
  return `
    <div class="btu-hotel-landing">
      <div class="btu-hotel-title">
        <span>${_btu_translate('title')}</span>
        <span class="btu-hotel-subtitle">${_btu_translate('subtitle')}</span>
      </div>
      <div class="btu-hotel-landing-input-container" onclick="showSearch(this)">
        <input class="btu-hotel-landing-input" type="text" placeholder="${_btu_translate('placeholder')}" />
        <div class="btu-hotel-landing-magnify">
          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        </div>
      </div>
      <div class="btu-hotel-landing-logo">
        <svg width="24px" height="23px" viewBox="0 0 48 46" version="1.1">
          <path fill="#5bace2" d="M18.3818,0.7637 C21.9810,-0.0989 25.7731,-0.0775 29.3789,0.7340 C29.4004,0.7653 29.4432,0.8263 29.4663,0.8577 C30.3224,2.0255 31.1521,3.2131 31.8878,4.4618 C32.5459,5.5472 33.1216,6.6771 33.6791,7.8169 C35.1637,7.7294 36.6548,7.6602 38.1426,7.7476 C39.2824,7.7773 40.4140,7.9125 41.5488,8.0164 L41.6824,8.0247 C43.0713,9.5686 44.2556,11.2907 45.2107,13.1331 C44.8164,14.3307 44.3826,15.5117 43.8828,16.6680 C43.0482,14.4577 41.8523,12.3975 40.3777,10.5534 C38.5187,10.3455 36.6432,10.3175 34.7744,10.3950 C35.6189,12.6268 36.2523,14.9344 36.6861,17.2816 C36.9072,18.6358 37.0952,19.9983 37.1744,21.3707 C37.0144,22.0701 37.7385,22.3637 37.9397,22.9459 C38.4428,24.0016 38.1096,25.3311 37.2239,26.0783 C37.2123,26.2169 37.1909,26.4907 37.1793,26.6276 C37.1397,27.2280 37.0952,27.8268 37.0193,28.4239 C36.9352,29.2404 36.8,30.0519 36.6680,30.8635 C36.2342,33.2437 35.5744,35.5793 34.7134,37.8408 C36.5476,37.9249 38.3835,37.8837 40.2111,37.7138 C41.8375,35.7624 43.1323,33.5307 43.9736,31.1307 C44.4206,29.9183 44.7059,28.6548 44.9352,27.3863 C45.5637,28.5839 46.1575,29.7979 46.6919,31.04 L46.7513,31.1719 C45.6527,34.6193 43.8020,37.8639 41.2734,40.4519 C38.7265,40.4684 36.1731,40.6284 33.6313,40.4041 C33.0193,41.5455 32.4453,42.7084 31.7723,43.8169 C30.5946,44.2754 29.3822,44.64 28.1451,44.8940 L27.8614,44.9567 C28.96,43.4078 29.9595,41.7880 30.8206,40.0956 C28.4981,39.7261 26.2037,39.1703 23.9851,38.3884 C22.7068,37.9364 21.4465,37.4268 20.2259,36.8395 C19.9686,36.7142 19.7113,36.5938 19.4540,36.4734 C18.7183,36.8016 17.8375,36.8280 17.1167,36.4453 C16.3101,36.0428 15.7591,35.2049 15.6832,34.3109 C15.5859,34.24 15.3913,34.0964 15.2940,34.0239 C14.0981,33.2470 12.9748,32.3645 11.8746,31.4573 C10.0651,29.9035 8.3892,28.1962 6.88,26.3505 C5.7880,28 4.8527,29.7468 4.0247,31.5414 C4.8643,33.8672 6.1905,35.9967 7.7723,37.8886 C9.7319,38.0569 11.7047,38.1030 13.6676,37.9694 C13.6841,38.0107 13.7171,38.0915 13.7319,38.1327 C14.0618,38.9426 14.4098,39.7443 14.7826,40.5360 C13.4630,40.6301 12.1435,40.7175 10.8206,40.6878 C9.4696,40.6696 8.1237,40.5723 6.7777,40.4437 C6.7018,40.4338 6.5501,40.4156 6.4742,40.4057 C3.3764,37.0837 1.2206,32.8808 0.4090,28.4057 C-0.1764,25.2420 -0.1336,21.9546 0.5723,18.8123 C1.4350,14.9096 3.3105,11.2412 5.9529,8.2457 C9.1909,4.5492 13.5950,1.8837 18.3818,0.7637 L18.3818,0.7637 Z M20.5080,3.0383 C19.2032,3.2626 17.9051,3.5694 16.6663,4.0445 C14.4428,4.8346 12.3810,6.0404 10.5303,7.4985 C9.4878,8.3760 8.4849,9.3113 7.6288,10.3752 C6.0750,12.2259 4.8098,14.3472 4.0032,16.6235 C4.8181,18.4511 5.7797,20.2144 6.8816,21.8870 C8.3562,20.0692 10.0156,18.4032 11.7657,16.8593 C12.8775,15.9901 13.9529,15.0597 15.1604,14.3257 L15.1587,14.2977 C15.3435,14.1756 15.5249,14.0486 15.7047,13.9167 C15.7080,13.3723 15.8432,12.8230 16.1550,12.3711 C16.8989,11.1967 18.6078,10.8404 19.7657,11.6057 C19.9620,11.5167 20.1583,11.4259 20.3562,11.3369 C21.5538,10.7447 22.8123,10.2927 24.0511,9.8012 C26.2828,9.0639 28.5756,8.5014 30.8948,8.1154 C30.0057,6.3802 29.0061,4.7010 27.8548,3.1257 C25.4334,2.6771 22.9410,2.6622 20.5080,3.0383 L20.5080,3.0383 Z M28.1253,11.3731 C26.8024,11.6931 25.4993,12.0940 24.2259,12.5707 L24.2787,12.5921 C23.1455,12.9006 22.0849,13.4713 21.0012,13.9331 C20.9105,14.6721 20.6020,15.4111 19.9983,15.8762 C19.2049,16.5426 18.0239,16.6432 17.1117,16.1632 C16.0280,16.8907 14.9525,17.6395 13.9694,18.5022 C12.8445,19.3913 11.8037,20.3859 10.8123,21.4202 C9.9859,22.2762 9.2206,23.1884 8.4816,24.1187 C9.2931,25.1414 10.1360,26.1410 11.0581,27.0663 L11.0531,27.0878 C12.0412,28.0610 13.0391,29.0292 14.1327,29.8853 C14.9971,30.6094 15.9158,31.2643 16.8445,31.8993 C17.6659,31.3550 18.7859,31.3187 19.6338,31.8235 C20.4964,32.3084 20.9863,33.2964 20.9567,34.2729 C22.0107,34.7711 23.0729,35.2527 24.1698,35.6470 C25.4630,36.1352 26.7876,36.5410 28.1303,36.8692 C29.3938,37.1826 30.6771,37.4070 31.9653,37.5917 C32.4684,36.3480 32.9204,35.0828 33.2767,33.7880 L33.2948,33.7797 C33.6544,32.4239 33.9744,31.0564 34.1888,29.6692 C34.3604,28.6152 34.4659,27.5529 34.5550,26.4874 C33.8721,26.1888 33.3030,25.6214 33.0606,24.9105 C32.5723,23.6288 33.2865,22.0898 34.5517,21.5901 C34.4692,20.5080 34.3620,19.4276 34.1789,18.3587 C33.9744,16.9731 33.6478,15.6090 33.2816,14.2597 C32.9204,13.0342 32.5063,11.8268 32.0346,10.6408 C30.72,10.8206 29.4119,11.0482 28.1253,11.3731 L28.1253,11.3731 Z M2.9459,20.4618 C2.5567,22.8783 2.5534,25.3525 2.9591,27.7674 C3.6387,26.5105 4.4057,25.3047 5.2008,24.1171 C4.3958,22.9311 3.6453,21.7121 2.9459,20.4618 Z"></path>
          <g fill="#5bace2" opacity="0.2">
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
        <span>${_btu_translate('brand')}</span>
      </div>
    </div>
    <div class="btu-hotel-search">
      <div class="btu-hotel-search-input-container">
        <svg onclick="hideSearch(this)" class="btu-hotel-search-input-arrow" width="24" height="24" viewBox="0 0 24 24"><path fill="#5bace2" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
        <input type="text" class="btu-hotel-search-input">
      </div>
      <div class="btu-hotel-search-query-container">
        <ul class="btu-hotel-search-query-list">
        </ul>
      </div>
    </div>
  `
}

// CSS
const _btu_CSS = `
#btu-hotel-container {
  width: 100%;
  height: 100%;
  font-family: "Poppins", sans-serif;
  background-color: white;
  border: 1px solid #797979;
  box-sizing: border-box;
}

.btu-hotel-landing {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
}

.btu-hotel-title {
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
  text-align: center;
}

.btu-hotel-subtitle {
  font-size: 18px;
  font-weight: normal;
}

.btu-hotel-title > img {
  margin-right: 10px;
}

.btu-hotel-landing-input-container {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  height: 50px;
  width: 100%;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.btu-hotel-landing-input {
  width: calc(100% - 50px);
  border: none;
  padding-left: 20px;
}

.btu-hotel-landing-input::placeholder {
  font-weight: bold;
}

.btu-hotel-landing-input:focus {
  outline-width: 0;
}

.btu-hotel-landing-magnify {
  background-color: #5bace2;
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btu-hotel-landing-logo {
  margin-top: 15px;
  display: flex;
  align-items: center;
  color: #5bace2;
}

.btu-hotel-landing-logo > svg {
  margin-right: 10px;
}

.btu-hotel-search {
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}

.btu-hotel-search-input-container {
  width: 100%;
  height: 50px;
  flex: 0 0 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #797979;
  padding: 0 5px;
  box-sizing: border-box;
}

.btu-hotel-search-input-arrow {
  cursor: pointer;
}

.btu-hotel-search-input {
  flex: 1 1 100%;
  border: none;
  padding: 0 10px;
}

.btu-hotel-search-input:focus {
  outline-width: 0;
}

.btu-hotel-search-query-container {
  flex: 1 1 auto;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.btu-hotel-search-query-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.btu-hotel-search-query-list-line {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
}

.btu-hotel-search-query-list-line:hover {
  background-color: #5bace2;
}

.btu-hotel-search-query-list-line-icon {
  flex: 0 0 24px;
}

.btu-hotel-search-query-list-line-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
  font-size: 14px;
  color: #797979;
}

.btu-hotel-search-query-list-line:hover .btu-hotel-search-query-list-line-text {
  color: white;
}

.btu-hotel-search-query-list-line:not(hover) svg {
  fill: #797979;
}

.btu-hotel-search-query-list-line:hover svg {
  fill: white;
}

.btu-hotel-search-query-list-line-text > span:first-child {
  font-weight: bold;
}
`

/**
 * CSS Leaderboard (typiquement 728×90 pixels)
 */
const _btu_CSS_leaderboard = `
.btu-hotel-landing {
  flex-direction: row-reverse;
}

.btu-hotel-title {
  display: none;
}

.btu-hotel-landing-logo {
  margin-top: 0;
  margin-right: 15px;
}

.btu-hotel-landing-logo span {
  white-space: nowrap;
}

.btu-hotel-search-input-container {
  width: 50%;
  flex: 1 1 auto;
  height: 100%;
  border-bottom: none;
  border-right: 1px solid #797979;
}

.btu-hotel-search-query-container {
  width: 50%;
  height: 100%;
}

.btu-hotel-search {
  flex-direction: row;
}
`

/*******************************************************
 * Fonctions spécifiques
 *******************************************************/

function showSearch(input) {
  const container = _btu_findParentById(input, 'btu-hotel-container')
  const landing = _btu_findChildByClass(container, 'btu-hotel-landing')
  const search = _btu_findChildByClass(container, 'btu-hotel-search')
  const searchInput = _btu_findChildByClass(search, 'btu-hotel-search-input')

  if (landing)
    landing.style.display = 'none'
  if (search)
    search.style.display = 'flex'
  if (searchInput)
    searchInput.focus()
}

function hideSearch(input) {
  const container = _btu_findParentById(input, 'btu-hotel-container')
  const search = _btu_findChildByClass(container, 'btu-hotel-search')
  const searchInput = _btu_findChildByClass(search, 'btu-hotel-search-input')
  const landing = _btu_findChildByClass(container, 'btu-hotel-landing')
  const landingInput = _btu_findChildByClass(landing, 'btu-hotel-landing-input')

  if (landingInput)
    landingInput.value = searchInput.value
  if (search)
    search.style.display = 'none'
  if (landing)
    landing.style.display = 'flex'
}

function btuSearch(searchQuery) {
  if (searchQuery) {
    const millisecondsInDay = 24 * 60 * 60 * 1000
    const language = 'fr'
    const startDate = new Date(new Date().getTime() + 3 * millisecondsInDay)
    const endDate = new Date(new Date().getTime() + 4 * millisecondsInDay)
    const startDateString = _btu_convertDateToString(startDate)
    const endDateString = _btu_convertDateToString(endDate)
    const guest = 1
    const pageNum = 1

    let addressBtu = null
    const container = document.getElementById('btu-hotel-container')
    if (container && container.dataset && container.dataset.address) {
      addressBtu = container.dataset.address
    }

    console.log(addressBtu)

    const query = {
      searchType: 'query',
      options: { searchQuery },
      language,
      startDate: startDateString,
      endDate: endDateString,
      guest,
      pageNum,
    }

    jQuery_btu.ajax({
      url: _btu_lightWidgetConfig.url.api,
      type: 'POST',
      data: JSON.stringify(query),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data){
        jQuery_btu('#btu-hotel-container .btu-hotel-search-query-list').empty()
        if (data.cities) {
          for (let i = 0; i < data.cities.length; i++) {
            let url = _btu_lightWidgetConfig.url.hotelList
            const parameters = {
              lat: data.cities[i].location.lat,
              lon: data.cities[i].location.lon,
              persons: guest,
              start: startDateString,
              end: endDateString,
              city: data.cities[i].defaultName + ', ' + data.cities[i].region,
              countryCode: data.cities[i].countryCode,
            }
            if (addressBtu) {
              parameters.w = addressBtu
            }
            url += Object.keys(parameters).map(function(key) {
              return [key, parameters[key]].map(encodeURIComponent).join("=").replace(/'/g, "%27")
            }).join("&")
            const li = `
              <li class="btu-hotel-search-query-list-line" onclick="_btu_openInNewTab('${url}')">
                <div class="btu-hotel-search-query-list-line-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </div>
                <div class="btu-hotel-search-query-list-line-text">
                  <span>${data.cities[i].defaultName}</span>
                  <span>${data.cities[i].region}, ${data.cities[i].country}</span>
                </div>
              </li>
            `
            jQuery_btu('#btu-hotel-container .btu-hotel-search-query-list').append(li)
          }
        }
        if (data.hotels) {
          for (let i = 0; i < data.hotels.length; i++) {
            let url = _btu_lightWidgetConfig.url.hotelHotel + data.hotels[i].hotelCode
            const parameters = {
              persons: guest,
              startDate: startDateString,
              endDate: endDateString,
            }
            if (addressBtu) {
              parameters.w = addressBtu
            }
            url += '?' + Object.keys(parameters).map(function(key) {
              return [key, parameters[key]].map(encodeURIComponent).join("=").replace(/'/g, "%27")
            }).join("&")

            const li = `
              <li class="btu-hotel-search-query-list-line" onclick="_btu_openInNewTab('${url}')">
                <div class="btu-hotel-search-query-list-line-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" /></svg>
                </div>
                <div class="btu-hotel-search-query-list-line-text">
                  <span>${data.hotels[i].name}</span>
                  <span>${data.hotels[i].city}</span>
                </div>
              </li>
            `
            jQuery_btu('#btu-hotel-container .btu-hotel-search-query-list').append(li)
          }
        }
      }
    })
  } else {
    jQuery_btu('#btu-hotel-container .btu-hotel-search-query-list').empty()
  }
}

/**
 * Fonction principale
 */
function _btu_loadLightWidget() {
  // Vérification de la présence du conteneur
  if (jQuery_btu(`#${_btu_lightWidgetConfig.placeholderTag}`).length === 0) {
	  console.log(_btu_translate("placeholderMissing"))
	  return
  }

  const containerWidth = jQuery_btu('#btu-hotel-container').width()
  const containerHeight = jQuery_btu('#btu-hotel-container').height()

  // Injection du CSS
  let style = document.createElement('style')
  style.type='text/css'
  style.appendChild(document.createTextNode(_btu_CSS))

  // CSS spécifiques suivant la taille du conteneur
  if (containerWidth > 600 && containerHeight < 120) {
    // Injection css Leaderboard
    style.appendChild(document.createTextNode(_btu_CSS_leaderboard))
  }

  // Injection de la police de caractères
  document.getElementsByTagName('head')[0].appendChild(style)
	let link = document.createElement('link')
	link.rel = "stylesheet"
	link.href = _btu_lightWidgetConfig.url.fonts
  document.getElementsByTagName('head')[0].appendChild(link)
  
  // Injection du composant
  jQuery_btu(`#${_btu_lightWidgetConfig.placeholderTag}`).html(_btu_lightWidget())

  // Gestion de l'input
  _btu_numberOfKeysPressed = 0
  const container = document.getElementById('btu-hotel-container')
  const input = _btu_findChildByClass(container, 'btu-hotel-search-input')
  if (input) {
    input.addEventListener('input', function() {
      _btu_numberOfKeysPressed++
      setTimeout(
        () => {
          if (_btu_numberOfKeysPressed > 0) {
            _btu_numberOfKeysPressed--
          }
          if (_btu_numberOfKeysPressed === 0) {
            btuSearch(input.value)
          }
        },
        300,
      )
    })
  }
}

// Chargement du widget à la création du document
jQuery_btu(() => {
	_btu_loadLightWidget(true)
})
