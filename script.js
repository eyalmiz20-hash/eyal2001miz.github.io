var currentLang = 'he';

  function applyLanguage(lang){
    currentLang = lang;
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-he', lang === 'he');
    document.body.classList.toggle('lang-en', lang === 'en');

    document.querySelectorAll('[data-he]').forEach(function(el){
      var val = lang === 'he' ? el.getAttribute('data-he') : el.getAttribute('data-en');
      if(val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-alt-he]').forEach(function(el){
      var val = lang === 'he' ? el.getAttribute('data-alt-he') : el.getAttribute('data-alt-en');
      if(val !== null) el.setAttribute('alt', val);
    });

    var metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc){
      var descVal = lang === 'he' ? metaDesc.getAttribute('data-he') : metaDesc.getAttribute('data-en');
      if(descVal) metaDesc.setAttribute('content', descVal);
    }

    document.getElementById('langToggle').textContent = lang === 'he' ? 'EN' : 'עב';
  }

  document.getElementById('langToggle').addEventListener('click', function(){
    applyLanguage(currentLang === 'he' ? 'en' : 'he');
  });

  var hamburger = document.getElementById('hamburgerBtn');
  var navMobile = document.getElementById('navMobile');
  hamburger.addEventListener('click', function(){
    var isOpen = navMobile.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navMobile.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
    });
  });

  document.querySelectorAll('.embed-wrap[data-embed]').forEach(function(wrap){
    function loadEmbed(){
      if(wrap.classList.contains('loaded')) return;
      var src = wrap.getAttribute('data-embed');
      wrap.innerHTML = '<iframe src="' + src + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
      wrap.classList.add('loaded');
    }
    wrap.addEventListener('click', loadEmbed);
    wrap.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); loadEmbed(); }
    });
  });

  applyLanguage('he');