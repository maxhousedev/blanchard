"use strict";

$(document).ready(function () {

  const
    MEDIA_PHONE_WIDE = 768,
    MEDIA_TABLET = 992,
    MEDIA_LAPTOP = 1200;
  // set breakpoint
  const maxPHONE_WIDE = window.matchMedia(`screen and (max-width: ${MEDIA_PHONE_WIDE - 1}px)`);
  const minPHONE_WIDE = window.matchMedia(`screen and (min-width: ${MEDIA_PHONE_WIDE}px)`);
  const PHONE_WIDE = window.matchMedia(`screen and (min-width: ${MEDIA_PHONE_WIDE}px) and (max-width: ${MEDIA_TABLET - 1}px)`);
  const minLAPTOP = window.matchMedia(`screen and (min-width: ${MEDIA_LAPTOP}px)`);
  // DOM
  const burger = $('.burger');
  // header
  // burger 
  const burgerClick = (element) => {
    $('html, body').toggleClass("no-scroll");
    $(element).toggleClass('is_active');
    $('.header-enter').toggleClass('btn_bordered header-enter__btn animate__animated animate__fadeInLeft');
    $('.header-nav').toggleClass('is_active');
    $('.header-top__menu').toggleClass('animate__animated animate__fadeInLeft');
  };
  // moove search to header-bottom
  const mooveSearchOnLaptop = () => {
    $('.form-search').appendTo('#header-bottom');
    $('.form-search').removeClass('form-search').addClass('form-search_laptop');
    return true;
  };
  // activate search
  const activateSearch = () => {
    $('html, body').toggleClass("no-scroll");
    $('.form-search').toggleClass('is_active');
    $('.form-search__btn_activate').toggleClass('is_active');
    $('.form-search__btn_search').toggleClass('is_active');
    $('.form-search__input').toggleClass('is_active');
    $('.form-search__input.is_active').val('');
    $('.burger').toggleClass("visually-hidden");
    $('.header-logo').toggleClass("visually-hidden");
    $('.form-search.is_active').toggleClass('animate__animated animate__fadeInDown');
    return true;
  };
  // create events slider
  const createEventsSwiper = (element) => {
    let swiperContainer, slides = '', start = '<div id="events-swiper-mobile" class="events-swiper_mobile swiper-container"><div class="swiper-wrapper">', slidesArr = [], end = '</div><div class="swiper-pagination"></div></div>';
    let numSlides = $('.event__item.event-card').length;
    for (let i = 1; (i <= numSlides); i++) {
      let innerHTML = $(`li.event__item.event-card.event-card_background-${i}`).html();
      slidesArr[(i - 1)] = `<div class="swiper-slide event-card event-card_background-${i}">${innerHTML}</div>`;
      slides = slides + slidesArr[(i - 1)];
    }
    swiperContainer = start + slides + end;
    $(element).after(swiperContainer);
    new Swiper('#events-swiper-mobile', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        430: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    });
    $('ul.events-list').remove();
    $('button.events__btn_showAll').remove();
    return true;
  };
  // create publication slider
  const createPublicationSwiper = () => {
    // remove phone styles
    $('.publications-subtitle.publications-subtitle_phone').removeClass('publications-subtitle_phone');
    $('.publications-cathegory-list.publications-cathegory-list_phone').removeClass('publications-cathegory-list_phone');
    $('.publication__cathegory-item.publication__cathegory-item_phone').removeClass('publication__cathegory-item_phone');
    // init swiper
    new Swiper('#publications-slider', {
      grabCursor: true,
      slidesPerView: 2,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
      },
      mousewheel: true,
      spaceBetween: 35,
      breakpoints: {
        // when window width is >= 992px
        992: {
          autoHeight: false,
          slidesPerView: 2,
          spaceBetween: 50,
        },
        // when window width is >= 1200px
        1400: {
          autoHeight: false,
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }
    });
  };
  // create publication  list
  // destroy publicaton slider
  const createPublicationList = () => {
    let cardArr = $('.publication-card');
    $('label.publications__label-price_max').after('<ul class="publication-card-list_phone"></ul>')
    for (let i = cardArr.length; (i != 0); i--) {
      $(`<li class="publication-card publication-card_background-${i} publication-card__item">${$(cardArr[i - 1]).html()}</li>`).prependTo('.publication-card-list_phone');
    }
    $('#publications-slider').remove();
  };
  // set max-height for cathegory list
  const setListMaxHeight = (list, listItem) => {
    let maxHeight = $(listItem).length * 10;
    $(list).css({ 'max-height': `${maxHeight}px` });

  };
  // tooltip
  const showTooltip = (element) => {
    let tooltipText = $(element).children('.projects-description__tooltip_text');
    $(element).toggleClass('is_active');
    $(tooltipText).toggleClass('is_active');
    return tooltipText;
  };

  const correctOverFlow = (icon, $element) => {
    let dLeft = 0;
    let containerPadding = parseFloat($('.container').css('padding-left'));
    let tooltipWidth = parseFloat($element.css('width'));
    let iconLeft = $(icon).offset().left;
    let iconRight = $(window).width() - $(icon).offset().left;
    if ((iconLeft - 0.5 * tooltipWidth) < containerPadding) {
      dLeft = 0.5 * tooltipWidth - (iconLeft - containerPadding);
    } else if ((iconRight - 0.5 * tooltipWidth) < containerPadding) {
      dLeft = - (0.5 * tooltipWidth - (iconRight - containerPadding));
    }
    $element.css('transform', `translateX(${dLeft}px)`);
  };
  //  =====================
  //* code below
  //  =====================
  //  =====================
  if (minPHONE_WIDE.matches) {
    // show all events
    $('.events__btn_showAll').click(function () {
      let num = 4;
      if (PHONE_WIDE.matches) {
        num = 3;
      }
      $('.events-list').css({ 'max-height': 'none' });
      $(`.event__item:nth-child(n + ${num})`).css({
        'transform': 'scale(1)',
        'visibility': 'visible'
      });

      let offset = $('#events').offset().top - 100;

      $('body, html').animate({
        scrollTop: offset
      }, 400);



      $(this).css('display', 'none');
    });
    createPublicationSwiper();
  } else { // not PHONE_WIDE
    createEventsSwiper('#events-title');
    createPublicationList();
  }
  //  =====================
  if (PHONE_WIDE.matches) {
    // set max-height for cathegory list
    setListMaxHeight('.publications-cathegory-list', '.publication__cathegory-item');
  }
  //  =====================
  if (minLAPTOP.matches) {
    mooveSearchOnLaptop();
    // header bottom submenu
    // header bottom submenu SimpleBar
    var submenuBar = [];
    $('.header-bottom__submenu-list').each(function () {
      submenuBar.push(new SimpleBar(this, {
        scrollbarMaxSize: 30,
      }));
    });
    // header bottom submenu dropdown and hide
    $('.header-bottom-menu__link').click(function (e) {
      e.preventDefault();
      // dropdown submenu jq collection
      let dropdownMenu = $('.header-bottom__submenu');
      // read active link  painting style
      // by data-painting-style attr
      let paintingStyle = $(this).attr('data-painting-style');
      dropdownMenu.each(function () {
        // active painting style by data-painting-style attr
        if ($(this).attr('data-painting-style') === paintingStyle) {
          //a ctivate dropdown submenu block
          let activeSubMenuBlock = this;
          $(activeSubMenuBlock).toggleClass('is_active animate__animated animate__fadeInDown');
          // activate header bottom link
          $(activeSubMenuBlock).siblings('.header-bottom-menu__link').toggleClass('is_active');
          // li jq collection of painters in dropdoww submenu block
          let painterList = $(this).find('.submenu__item');
          painterList.click(function (e) {
            e.preventDefault();
            let activePainter = this;
            // activate active painter
            $(activePainter).toggleClass('is_active');
            // deactivate active header-bottom-menu__link
            $(activeSubMenuBlock).siblings('.header-bottom-menu__link').removeClass('is_active');
            painterList.each(function () {
              // deactivate others
              if ((this !== activePainter) && $(this).hasClass('is_active')) {
                $(this).removeClass('is_active');
              }
            });
            // until hide active submenu block
            // on painter click
            setTimeout(() => $(activeSubMenuBlock).removeClass('is_active'),
              1000);
          });
        } else { // deactivate others
          if ($(this).hasClass('is_active')) {
            $(this).removeClass('is_active animate__animated animate__fadeInDown');
            $(this).siblings('.header-bottom-menu__link').removeClass('is_active');
          }
        }
      });
    });
    // projects
    // show tooltip on hover
    $('.projects-description__tooltip_icon').hover(function () {
      correctOverFlow(this, showTooltip(this));
    });
  } else { // not minLAPTOP
    // burger
    $(burger).click(function (e) {
      e.preventDefault();
      burgerClick(this);
    });
    // activate search
    $('.form-search__btn_activate').click(function (e) {
      e.preventDefault();
      activateSearch();
    });
    // evevnts
    // slidedown  cathegory on phone
    $('.publications-subtitle_phone').click(function () {
      $(this).toggleClass('is_active');
      $('.publication__cathegory-item_phone').each(function () {
        $(this).toggleClass('animate__animated animate__backInDown');
        if (!$(this).hasClass('checked')) {
          let item = this;
          $(item).toggleClass('is_active');
        }
      });
    });
    // projects
    // show tooltip on click
    $('.projects-description__tooltip_icon').click(function (e) {
      e.preventDefault();
      correctOverFlow(this, showTooltip(this));
    });
  }
  //  =====================
  // hero
  //  =====================
  // hero slider
  new Swiper('#hero-slider', {
    loop: true,
    autoplay: {
      delay: 8000,
    },
    grabCursor: true,
    effect: 'fade',
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
    },
    mousewheel: true,
  });
  //  =====================
  // gallery
  //  =====================
  // gallery slider
  new Swiper('#gallery-slider', {
    loop: false,
    autoplay: false,
    grabCursor: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
    },
    mousewheel: true,
    spaceBetween: 15,
    breakpoints: {
      // when window width is >= 768px
      768: {
        autoHeight: false,
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerGroup: 4,
        spaceBetween: 35,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerGroup: 4,
        spaceBetween: 50,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerGroup: 6,
        spaceBetween: 50,
      },
    },
  });
  //  =====================
  // custom search icon
  $('#gallery-slider').find('.swiper-slide').click(function () {
    $(this).toggleClass('is_active');
    console.log(this);
  });
  //  =====================
  // gallery filter
  new Choices($('#filter-author')[0], {
    position: 'bottom',
    searchEnabled: false,
    shouldSort: false,
    placeholder: false,
  });
  new Choices($('#filter-trend')[0], {
    position: 'bottom',
    searchEnabled: false,
    shouldSort: false,
    placeholder: false,
  });
  new Choices($('#filter-technic')[0], {
    position: 'bottom',
    searchEnabled: false,
    shouldSort: false,
    placeholder: false,
  });
  // hide others
  $('.gallery__filter').click(function () {
    let _this = this;
    $(this).toggleClass('translate');
    $('.gallery__filter').each(function () {
      if (this != _this) {
        $(this).toggleClass('opacity-none');
      }
    });
  });
  $('.gallery__filter').on('change', function () {
    $('.gallery__filter').each(function () {
      if ($(this).hasClass('opacity-none')) {
        $(this).removeClass('opacity-none');
      }
      if ($(this).hasClass('translate')) {
        $(this).removeClass('translate');
      }
    });
  });
  //  =====================
  // catalog
  //  =====================
  // tabs
  const btnTab = $('.btn-tab-trigger');
  //  =====================
  $(btnTab).click(function () {
    let target = $(this).attr('data-tab');
    let activeTab = $(`.tab-content[data-tab=${target}]`);
    $('.btn-tab-trigger.is_active').removeClass('is_active');
    $(this).addClass('is_active');
    $('.tab-content.is_active').find('.accordion__item.acc_section[tabindex]').removeAttr('tabindex');
    $('.tab-content.is_active').removeClass('is_active');
    $(activeTab).addClass('is_active');
    // set tabindex to focus  accordion header
    let accHeader = $(activeTab).children('.accordionjs').children('.accordion__item.acc_section');
    $(accHeader).each(function (index) {
      $(this).attr('tabindex', `${index + 1}`);
    });
    $(activeTab).find('.accordion__item.acc_section[tabindex=1]').focus();
    $(activeTab).find('.accordion__item.acc_section[tabindex]').keypress(function (e) {
      if (e.key == 'Enter') {
        $(this).children('.acc_head').click();
        $('.tab-content.is_active').find('.accordion__item.acc_section[tabindex]').removeAttr('tabindex');
      }
    });
  });
  // accordion
  $('.accordionjs').accordionjs({
    closeAble: true,
    slideSpeed: 400,
  });
  // display active painter info
  const displayPainter = (element) => {
    // painters info
    let painterArr = [
      // add painter as folllows
      {
        id: 'test',
        name: 'Painter Name',
        years: 'ок. 1400 г. —  2000 г.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam rem illum mollitia, nemo voluptas expedita animi laudantium vitae vero! Odit autem laborum ipsum harum numquam, sapiente tempora esse ipsam doloremq.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam rem illum mollitia, nemo voluptas expedita animi laudantium vitae vero! Odit autem laborum ipsum harum numquam, sapiente tempora esse ipsam doloremq. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam rem illum mollitia, nemo voluptas expedita animi laudantium vitae vero! Odit autem laborum ipsum harum numquam, sapiente tempora esse ipsam doloremq.'
      },
      {
        id: 'Bindo',
        name: 'Бенедетто ди Биндо',
        years: 'ок. 1380-85 г. — 19 сентября 1417 г.',
        description: 'Бенедетто ди Биндо остался в истории искусства как сиенский художник, так сказать, «второго ряда», несмотря на то, что за свою короткую жизнь он выполнил ряд весьма престижных заказов, включая работы в Сиенском соборе (работы в главном соборе республики второстепенным художникам не поручались). Обучение он прошёл у Таддео ди Бартоло, крупного сиенского мастера поздней готики, в боттеге которого Бенедетто трудился вместе с Грегорио ди Чекко. Наибольшее влияние на его творчество оказали работы Симоне Мартини, в частности в выборе колорита, а тонко проработанные лица его персонажей напоминают произведения Джованни да Милано.'
      },
      {
        id: 'Ambrogio',
        name: 'Бергоньоне, Амброджо',
        years: '1453 г. — 1523 г.',
        description: 'Прозвище говорит о его тяготении к бургундской школе, по манере ему близок Винченцо Фоппа. Испытал влияние Леонардо да Винчи. Наиболее известен работами 1486—1494 в монастырской обители картезианцев Чертоза ди Павия. Позднее работал в Милане в базилике Сант-Эусторджо и церкви Сан-Сатиро, после 1497 — в Лоди, в 1512 — в Бергамо, незадолго до смерти — снова в Милане, в базилике Сан-Симпличано.'
      },
      {
        id: 'Bissolo',
        name: 'Биссоло, Франческо',
        years: '1470 г. — 20 апреля 1554 г.',
        description: 'Сын художника. Ученик Джованни Беллини. С 1490 переехал в мастерскую Беллини. С 1492 по 1530 год работал в Венеции. Помогал учителю в работе над украшением Большого зала Совета Дворца дожей (Венеция). Принимал участие в создании украшений Церкви Иль Реденторе в Венеции.      Художник эпохи Возрождения. В своём творчестве подражал Джорджоне.'
      },
      {
        id: 'Boltraffio',
        name: 'Больтраффио, Джованни',
        years: '1466 г. — 1516 г.',
        description: 'Вазари сообщает, что художник происходил из аристократической семьи. Воспитанный в традициях Фоппы, Бернардо Дзенале и Амброджо Бергоньоне, он прошёл обучение в мастерской Леонардо. Его первое произведение «Воскресение Христа, святой Леонард и святая Лючия» выполнено в 1491 году совместно с Марко д\'Оджоно для миланской церкви Сан-Джованни-сул-Муро. Был придворным художником Лодовико Моро и славился своими психологическими портретами.        Больтраффио умер в возрасте 49 лет и был похоронен на кладбище церкви Св. Паулы в Комито. Некоторые искусствоведы предполагают, что фигура младенца на картине Леонардо да Винчи «Мадонна Литта» принадлежит кисти Джованни Антонио Больтраффио. Известны подготовительные рисунки Джованни Антонио Больтраффио, в точности воспроизводящие эту фигуру.'
      },
      {
        id: 'Bonsignori',
        name: 'Бонсиньори, Франческо',
        years: '1460 г. — 2 июля 1519 г.',
        description: 'Родился около 1460 года в Вероне в семье художника Альберто Бонсиньори. Обучался живописи в мастерской Франческо Бенальо. В 1480 году переехал из Вероны в Венецию, где жил до 1487 года. В ранний период творчества находился под влиянием венецианской живописной школы. Особенное впечатление на Бонсиньори оказало творчество Антонелло да Мессины, Джованни Беллини, Чима да Конельяно и Альвизе Виварини.Среди известных творений этого периода самыми ранними произведениями художника являются полотна «Мадонна со спящим младенцем» 1483 года и «Алтарь Даль Бово», или «Мадонна на троне с предстоящими святыми и донатором Альтабеллой Авогадро» 1484 года, которые ныне входят в собрание Общественного музея Вероны.'
      },
      {
        id: 'Botticini',
        name: 'Боттичини, Рафаэлло',
        years: '17 сентября 1477 г. —  1520 г.',
        description: 'Рафаэлло принадлежал к флорентийской артистической династии — его дед, Джованни ди Доменико, был известен как художник, расписывавший игральные карты (хотя учёные не исключают, что он мог заниматься и более серьёзной живописью); его отец — Франческо ди Джованни, был известным флорентийским мастером. Первые художественные навыки Рафаэлло получил в мастерской отца; с этой мастерской связан и ранний период его творчества. В 1490-е годы, когда формировался художественный вкус Рафаэлло, мастерская его отца занималась в основном исполнением заказов в провинциальных городках в окрестностях Флоренции. В 1498 году Франческо Боттичини скончался, Рафаэлло унаследовал мастерскую и продолжил работать в провинции. По мнению исследователей его творчества, это был художник скромного дарования, никогда не стремившийся завоевать высоких позиций в интеллектуальном и финансовом центре Тосканы — Флоренции, и довольствовавшийся заказами, которые ему давали провинциальные храмы. Его искусство было эклектичным, и наряду с влиянием отца включало связь с искусством Перуджино, Ридольфо Гирландайо, Лоренцо ди Креди, Фра Бартоломео и др.'
      },
      {
        id: 'Bramantino',
        name: 'Брамантино',
        years: 'ок. 1465 г. —  1530 г.',
        description: 'Бартоломео Суарди родился около 1465 года в Милане (по другой версии — в Бергамо). В Милане, где «царил» Леонардо, Брамантино создал яркий, острый стиль, хотя и страдавший иногда недостатками в передаче перспективы и неточностью изображения архитектурных элементов. Брамантино сформировался под влиянием Бутиноне и графического стиля Падуи и Феррары. Впоследствии он многому научился у Браманте, у которого долгое время состоял помощником (чем и объясняется его прозвище Брамантино — букв. «Маленький Браманте») и у которого перенял любовь к монументальным формам и драматизму. Некоторые искусствоведы полагают, что Браманте поручал Брамантино, как живописцу, осуществление своих замыслов. В зрелый период своего творчества, когда были выполнены шпалеры для созданного им мавзолея Тривульцио, художник придерживался строгой композиционной уравновешенности. Переехав в Рим в 1508 году, где он расписывал лоджии в Ватикане, Брамантино начал работать в новой манере, близкой к маньеристскому стилю.Брамантино умер в 1530 году.'
      },
      {
        id: 'Brea',
        name: 'Бреа, Людовико',
        years: 'ок. 1450 г. —  1522/25 г.',
        description: 'Бреа родился в происходившей из Монтальто-Лигуре семье бондарей в Ницце, являвшейся в то время частью Генуэзской республики. Бреа был в основном клерикальным художником, и наиболее значительные его работы представляют собой алтарные картины. Первая значимая работа художника представляет собой роспись францисканского монастыря в Симье (современная Ницца). Прочие работы художника сосредоточены прибрежных поселениях между Монако и Ментоной, между Таджей и Империей и между Савоной и Генуей. Одним из учеников Людовико Бреа был Террамо Пьяджо.'
      },
      {
        id: 'Biagio',
        name: 'Бьяджо д’Антонио Туччи',
        years: '1446 г. —  1 июля 1516 г.',
        description: 'Родился во Флоренции. Последнюю четверть XV века работал в Фаэнце, но в его стиле мало элементов флорентийского стиля — прослеживается влияние ранней нидерландскрй живописи. Сотрудничал с другими художниками над фресками Сикстинской капеллы.'
      },
      {
        id: 'Vecchietta',
        name: 'Веккьетта',
        years: 'ок. 1410 г. —  6 июня 1480 г.',
        description: 'О Веккьетте сообщает в своих «Жизнеописаниях» Джорджо Вазари и описывает его как человека мрачного и нелюдимого, вечно погружённого в раздумья, и потому прожившего недолго. Позднейшие исследователи пытались имя этого художника увязать с какими-либо архивными данными. Сейчас общепризнанной считается версия, что описанный Вазари Веккьетта — это Лоренцо ди Пьетро ди Джованни, который был крещён в Сиене в 1410 году. Имя этого человека появляется в документах в 1428 году среди членов гильдии художников Сиены.'
      },
      {
        id: 'Verrocchio',
        name: 'Андреа Верроккьо',
        years: '1435 г. —  10 октября 1488 г.',
        description: 'Андреа дель Верроккьо родился и работал во Флоренции. Своё имя (del Verrocchio — «от Верроккьо»), он получил от своего учителя, ювелира Верроккьо. Специализировался на скульптуре, но также обращался и к живописи.В эпоху Раннего Возрождения художники работали почти исключительно по заказам, поэтому в то время была велика роль меценатов. Эта практика особенно распространилась во Флоренции XV века, где художественные мастерские осуществляли любые заказы покровителей — от росписи посуды до архитектурных проектов. Верроккьо считался непревзойденным декоратором и режиссёром придворных празднеств.'
      },
      {
        id: 'Benozzo',
        name: 'Беноццо Гоццоли',
        years: '1420 г. —  1497 г.',
        description: 'Беноццо Гоццоли родился в 1420 году во Флоренции, в семье портного. Настоящее имя художника — Беноццо ди Лезе ди Сандро (фамилия Гоццоли впервые появляется лишь во втором издании «Жизнеописаний» Вазари).  Период становления Гоццоли как художника пришёлся на годы, в которые флорентийское искусство переживало настоящий расцвет. В 1430—1440 годы во Флоренции работали Фра Беато Анджелико, Филиппо Липпи, Паоло Учелло, Доменико Венециано, Пьеро делла Франческа. Согласно Джорджо Вазари, учителем Гоццоли был Фра Анджелико, однако многие историки искусства оспаривают этот факт. Несомненно, однако, что в 1439—1440 и в 1443—1444 годы Гоццоли работал совместно с Фра Анжелико над фресками монастыря Сан-Марко.'
      },
      {
        id: 'Granacci',
        name: 'Граначчи, Франческо',
        years: '23 июля 1469 г. — 30 ноября 1543 г.',
        description: 'Франческо Граначчи учился в мастерской Доменико Гирландайо и помогал ему в написании его картин, используя вместо темперы масляные краски. По заказу Лоренцо Медичи Граначчи участвовал в росписи флорентийского Сан-Марко. Позднее он работал с Леонардо да Винчи, Микеланджело и Рафаэлем. В 1508 году Граначчи переехал в Рим, где вместе с другими художниками помогал Микеланджело в росписи Сикстинской капеллы. На стиль Граначчи оказали влияние Филиппино Липпи и Фра Бартоломео. Граначчи упоминается в «Жизнеописаниях художников» Джорджо Вазари.  Также упоминается в романе о Микеланджело Ирвинга Стоуна «Муки и радости».'
      },
      {
        id: 'Ghirlandaio',
        name: 'Доменико Гирландайо',
        years: '2 июня 1448 г. — 11 января 1494 г.',
        description: 'Один из ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в течение года овладевал   профессиональными навыками. Автор фресковых циклов, в которых выпукло, со всевозможными подробностями показана домашняя жизнь библейских персонажей (в их роли выступают знатные граждане Флоренции в костюмах того времени).'
      },
      {
        id: 'Cecco',
        name: 'Грегорио ди Чекко',
        years: '1390 г. — 1424 г.',
        description: 'О Грегорио очень мало сведений. Известно, что он был приёмным сыном и учеником Таддео ди Бартоло, работал в его мастерской, а единственным достоверным произведением является алтарь, написанный им в 1423 году для капеллы Франческо Толомеи в сиенском соборе, на котором стоит его подпись. В начале XX века его путали с упоминаемым в документах Джорджо ди Кеко ди Лука (Giorgio di Checo di Lucha), поскольку Миланези в 1853 году неправильно транскрибировал имя Грегорио.'
      },
      {
        id: 'Udine',
        name: 'Джованни да Удине',
        years: '1487 г. — 1564 г.',
        description: 'Учился сначала у Джованни Мартино (итал. Pellegrino da San Daniele) в Удине, затем переехал в Венецию, где стал учеником Джорджоне. В 1514 году переехал в Рим, где поступил в мастерскую Рафаэля и считался одним из наиболее талантливых его учеников. Джорджо Вазари отмечал его стремление к гротеску и большую любовь к изображению природы — как растений и животных, так и неодушевлённых предметов. После смерти Рафаэля работал на кардинала Джулио Медичи (будущего папу Климента VII) по украшению Вилла Мадама, завершив работу к 1525 году; находился в конфликте с Джулио Романо.'
      },
      {
        id: 'Paolo',
        name: 'Джованни ди Паоло',
        years: '1403 г. — 1482 г.',
        description: 'Сведений о жизни художника сохранилось крайне немного. Джованни ди Паоло родился в Сиене около 1403 года. Точная дата рождения неизвестна; первый существующий документ, в котором фигурирует его имя, датирован 1417 годом. По всей видимости, учителем Джованни ди Паоло был Таддео ди Бартоло. Свою творческую карьеру ди Паоло начал как художник-миниатюрист. Расцвет его деятельности пришёлся на 1440—1450-е годы: в это время художник создаёт самые известные свои произведения.  На протяжении всей своей жизни Джованни ди Паоло не покидал свой родной город и умер в Сиене в 1482 году.'
      },
      {
        id: 'Giorgione',
        name: 'Джорджоне',
        years: '1477 г. — 1510 г.',
        description: 'Джорджоне родился в небольшом городке Кастельфранко-Венето недалеко от Венеции. В 1493 перебрался в Венецию и стал учеником Джованни Беллини. В 1497 появилась его первая самостоятельная работа — «Христос, Несущий Крест». Согласно Вазари, в апреле 1500 встречался с Леонардо да Винчи. В 1504 исполнил в родном городе Кастельфранко заказанный ему алтарный образ «Мадонна Кастельфранко», предназначенный для семейной часовни Святого Георгия в местном соборе, чтобы увековечить память Маттео Костанцо. По распоряжению Сената республики в 1507—1508 привлекался к фресковым росписям Немецкого подворья (сохранился фрагмент с изображением женской фигуры), работы были завершены, как об этом свидетельствует официальный документ, 14 декабря 1508. Умер в октябре-ноябре 1510 года от чумы.'
      },
      {
        id: 'Parentino',
        name: 'Парентино, Бернардо',
        years: 'ок. 1437 г. — 1531 г.',
        description: 'Родился в городе Паренцо, принадлежащем венецианской республике и находящимся на побережье полуострова Истрия. Там же, вероятнее всего, получил начальное образование. Умер в городе Виченца. Испытал сильное влияние, а возможно и был учеником Андреа Мантеньи. Также художник известен под именами Бернардо Паренцано, Бернардо да Паренцо, Бернардино Парентино. Ошибочно отождествлялся с августинским монахом Лоренцо.'
      },
      {
        id: 'Pesellino',
        name: 'Пезеллино',
        years: 'ок. 1422 г. — 1457 г.',
        description: 'Итальянский историк искусства Джорджо Вазари составил небольшую биографию художника, в которой с восторгом отзывается о его творчестве, но, в то же время, перепутал в ней, кажется, всё, что только можно. Франческо ди Стефано родился в семье Стефано ди Франческо и его супруги Нанны, которая была старшей дочерью художника Джулиано д’Арриго по прозвищу Пезелло. В 1427 году, когда мальчику было всего 5 лет, его отец скончался, и ребёнок переселился к своему деду по материнской линии — Джулиано д’Арриго, мастерская которого находились на корсо Адимари во Флоренции (ныне это виа деи Кальцайоли). От деда к Франческо перешло и прозвище «Пезеллино» (то есть «маленький Пезелло»). В двадцатилетнем возрасте Франческо Пезеллино женился на Тарсии, дочери некоего Сильвестера из Роппо, о чём свидетельствует сохранившийся документ, датированный 22 ноября 1442 года.'
      },
      {
        id: 'Perugino',
        name: 'Пьетро Перуджино',
        years: '1448 г. — 1423 г.',
        description: 'Родился в местечке Читта-делла-Пьеве в 35 км от Перуджи. После обучения у местного живописца в 1470 году приехал во Флоренцию и поступил в мастерскую Андреа Верроккьо. В 1481 году, будучи уже известным мастером, в числе лучших художников Италии приглашён папой Сикстом IV в Рим для участия в работах над декорированием Сикстинской капеллы. Работал во многих городах Италии, но более всего в Перудже, где он был главой большой мастерской. В 1480—1490-х годах Перуджино был одним из самых прославленных художников Италии. Самый же знаменитый из его учеников — Рафаэль Санти. Лучшими произведениями Перуджино считаются созданные до 1500 года. Выделяется фреска «Вручение ключей апостолу Петру», которая отличается стройностью композиции. Одна из самых известных картин — «Оплакивание Христа». После смерти в 1520 году Рафаэля учитель завершил не законченные его великим учеником фрески в церкви Перуджи. Перуджино умер от чумы в Перудже в 1524 году.'
      },
      {
        id: 'Peruzzi',
        name: 'Перуцци, Бальдассаре',
        years: '15 января 1481 г. — 6 января 1536 г.',
        description: 'Родился в небольшом городке близ Сиены. С 1503 года работал в Риме. Быстро получил признание как архитектор и мастер иллюзорных росписей, создающих эффект продолжения архитектурного пространства. Поэтому Перуцци считают создателем римской школы фасадных росписей, в основном гризайлью, но они не сохранились до нашего времени. Вначале Перуцци работал вместе с Донато Браманте, но затем перешёл к Рафаэлю. Биографы считают автором знаменитого «Письма Рафаэля» папе Льву Х — введения к Археологическому плану античного Рима — именно Перуцци.'
      },
      {
        id: 'Pisanello',
        name: 'Пизанелло',
        years: 'ок. 1392/1395 г. — вероятно 1455 г.',
        description: 'Родился в семье суконщика Пуччо ди Джованни да Черетта. После его смерти вдова Изабета с сыном Антонио переехала в свой родной город — Верону. Первым учителем будущего художника стал Стефано да Верона, позднее его наставником и другом стал Джентиле да Фабриано. С да Фабриано Пизанелло в 1409—1415 годах в Венеции работал над украшением Зала Большого совета во Дворце Дожей (оформление зала погибло при пожаре в 1577 году). После внезапной смерти Джентиле (1427) Пизанелло продолжил начатую им роспись базилики Сан Джованни ин Латерано (не сохранилась). В 1420-х годах работал над фресками в замке Висконти в Павии — этот фресковый цикл погиб во время войны с Францией в 1527 году.'
      },
      {
        id: 'Pinturicchio',
        name: 'Пинтуриккьо',
        years: '1454 г. — 1513 г.',
        description: 'Представитель умбрийской школы кватроченто. Учился у Фьоренцо ди Лоренцо, вместе с Рафаэлем — у Перуджино, которому помогал при создании фресок Сикстинской капеллы Ватикана (1481—1482), а по некоторым данным — ещё и у Бенедетто Капорали, создателя дворца кардинала Пассерини, впоследствии расписанного Синьорелли. Вероятно, испытал влияние и Бенедетто Бонфильи, учителя Перуджино. Став зрелым мастером, Пинтуриккьо отказался от некоторых принципов Перуджино — однообразности и степенности фигур, единства времени и места, — что сближает его скорее с Боттичелли. Работал во многих городах Италии — Перудже, Риме, Орвието, Сполето, Сиене. Наиболее известные росписи — в церкви Санта-Мария-дель-Пополо, Апартаментах Борджиа и Сиенском соборе (библиотека Пикколомини). На его фресках часто появляются «гротески» (элементы растительного и архитектурного орнамента). Из станковых полотен примечателен «Портрет мальчика», хранящийся в Дрезденской галерее.'
      },
      {
        id: 'Tintoretto',
        name: 'Тинторетто',
        years: '1518 г. — 1594 г.',
        description: 'Художник родился в Венеции, по разным источникам (между концом сентября и началом октября 1518) — в 1519 либо 1518 году. Он был старшим из 21 ребёнка, родившихся в семье. Своё прозвище Тинторетто («маленький красильщик» или «сын красильщика») он получил по профессии отца, бывшего красильщиком тканей (tintore). Возможно, подлинная фамилия отца Комин (Comin)[8]. По поводу происхождения существуют две версии, по одной семья вышла из Брешии (Ломбардия), бывшей в то время частью Венецианской республики, по другой версии, они были выходцами из Лукки.'
      },
      {
        id: 'Friedrich',
        name: 'Фридрих, Каспар Давид',
        years: '1774 г. — 1840 г.',
        description: 'Каспар Давид Фридрих родился в семье мыловара. В молодости лишился большинства родственников — в 1781 г. умерла мать художника, затем скончались его две сестры и брат. В 1790 г. получил первые уроки рисования. С 1794 по 1798 г. Фридрих учился изобразительному искусству в Датской королевской академии изящных искусств в Копенгагене. После возвращения из Дании путешествовал по различным городам Германии, пока не обосновался в Дрездене. Сблизился с кружком романтиков, включавшим Л. Тика, Новалиса, Г. фон Клейста, а также Ф. О. Рунге; в 1810 познакомился с И. В. Гёте, а в 1821 — с В. А. Жуковским; был дружен и с натурфилософом и художником К. Г. Карусом. Находился в близких отношения с норвежским художником Юханом Далем, оказал большое влияние на его творчество. В поисках мотивов с 1801 неоднократно приезжал на остров Рюген в Балтийском море; любил путешествовать по Саксонской Швейцарии и Гарцу; часто бывал в родном Грайфсвальде. До 1807 работал исключительно в технике рисунка (преимущественно штифтом или сепией), затем обратился и к масляной живописи. В 1810 г. к живописцу пришёл публичный успех.'
      },
      {
        id: 'Monet',
        name: 'Моне, Клод',
        years: '14 ноября 1840 г. — 5 декабря 1940 г.',
        description: 'Оскар Клод Моне родился 14 ноября 1840 года[7] в Париже. Он был вторым ребёнком бакалейщика Клода Адольфа Моне и Луизы Жюстины (урождённой Обре)[8]. Когда мальчику было пять лет, семья переехала в Нормандию, в Гавр. Отец хотел, чтобы Клод стал бакалейщиком и продолжил семейное дело. Юность Моне, как он сам отмечал впоследствии[9], по существу, была юностью бродяги. Он проводил больше времени в воде и на скалах, чем в классе. Школа ему, по натуре недисциплинированному, всегда казалась тюрьмой. Он развлекался, разрисовывая голубые обложки тетрадей, и использовал их для портретов своих учителей, сделанных в весьма непочтительной, карикатурной манере, и в этой забаве вскоре достиг совершенства. В пятнадцать лет Моне был известен всему Гавру как карикатурист[10]. Он настолько упрочил свою репутацию, что со всех сторон его осаждали просьбами сделать карикатурные портреты. Изобилие подобных заказов и недостаточная щедрость родителей внушили ему смелое решение, которое шокировало его семью: за свои портреты Моне брал по двадцать франков, таким образом он скопил около 2000 франков.'
      },
      {
        id: 'Sisley',
        name: 'Сислей, Альфред',
        years: '30 октября 1839 г. — 29 января 1899 г.',
        description: 'Сислей родился 30 октября 1839 года в Париже, его отцом был британский коммерсант Уильям Сислей (Сисли). В 1857 году родители отправили Альфреда в Лондон для обучения коммерции, но юноша предпочёл заниматься живописью и в 1862 г. вернулся в Париж. По возвращении он поступил в мастерскую Шарля Глейра, где сблизился с Клодом Моне, Камилем Писсаро, Огюстом Ренуаром и Фредериком Базилем. Наибольшее влияние на Сислея как на художника оказали британские мастера Уильям Тёрнер, Джон Констебл и Ричард Паркс Бонингтон, а также французы Камиль Коро, Гюстав Курбе и Эжен Буден.'
      },
      {
        id: 'Manet',
        name: 'Мане, Эдуард',
        years: '23 января 1832 г. — 30 апреля 1883 г.',
        description: 'Эдуард Мане родился в доме 5 по улице Бонапарта в парижском квартале Сен-Жермен-де-Пре в семье Огюста Мане, главы департамента Министерства юстиции, и Эжени-Дезире Фурнье, дочери французского дипломата, бывшего консулом в Гётеборге. Шведский король Карл XIII был крёстным отцом матери Мане. В 1839 году Мане отдан на обучение в пансион аббата Пуалу, затем по причине абсолютного равнодушия к учёбе был переведён отцом «на полный пансион» в колле́ж Роллена (фр.), где и обучался в период с 1844 по 1848 год, также не проявляя никаких успехов.'
      },
      {
        id: 'Kandinsky',
        name: 'Кандинский, Василий Васильевич',
        years: '16 декабря 1866 г. — 13 декабря 1944 г.',
        description: 'Кандинский происходил из семьи нерчинских купцов, потомков каторжан. Его прабабушка была тунгусской княжной Гантимуровой, а отец — представителем старинного кяхтинского рода Кандинских, которые считали себя потомками правителей мансийского Кондинского княжества. Троюродный брат Виктор Кандинский — известный психиатр.'
      },
      {
        id: 'Malevich',
        name: 'Малевич, Казимир Северинович',
        years: '23 февраля 1879 г. — 15 мая 1935 г.',
        description: 'Российский и советский художник-авангардист польского происхождения, педагог, теоретик искусства, философ. Основоположник супрематизма — одного из крупнейших направлений абстракционизма.'
      },
      {
        id: 'Carra',
        name: 'Карра, Карло',
        years: '11 февраля 1881 г. — 13 апреля 1966 г.',
        description: 'Карло Карра изучал живопись на вечерних курсах в Академии Брера в Милане и вначале работал как художник по декорациям. В 1899—1900 годах, во время Всемирной выставки, молодой художник приезжает в Париж и знакомится там с современной французской живописью. Заинтересовался анархизмом и социализмом; находясь в Лондоне в 1900 году, штудировал труды Карла Маркса, Макса Штирнера и М. А. Бакунина.'
      },
    ],
      activePainter = new Object(), // active painter data
      dataPainter = $(element).attr('data-painter'),
      displayPainterBlock = $('.painter-output'); // html otput block
    // choose active painter from painter arr by using data-painter
    // write one into active painter
    for (let i = 0; (i < painterArr.length); i++) {
      if (dataPainter === painterArr[i].id) {
        activePainter = painterArr[i];
      }
    }
    // display painter info
    // img into html img.painter-output__img
    $(displayPainterBlock).children('.painter-output__img').attr('src', `/img/catalog/${activePainter.id}.jpg`);
    // years into html span.painter-output__years
    $(displayPainterBlock).children('.painter-output__years').text(activePainter.years);
    // name into html h3.painter-output__years
    $(displayPainterBlock).children('.painter-output__header').text(activePainter.name);
    // description into html p.painter-output__description
    $(displayPainterBlock).children('.painter-output__description').text(activePainter.description);
  };
  // choose painter by click
  $('.painter__link').click(function (e) {
    e.preventDefault();
    displayPainter(this);
    let offset = $('.painter-output').offset().top - 100;
    $('body, html').animate({
      scrollTop: offset
    }, 400);
  });
  // default painter
  displayPainter('.painter__link[data-painter=Ghirlandaio]');
  //  =====================
  // publications
  //  =====================
  // check cathegory
  $('input[type=checkbox]').on('change', function () {
    if (!$(this).attr('checked')) {
      $(this).attr('checked', 'true').parent().parent().addClass('checked');
    } else {
      $(this).removeAttr('checked').parent().parent().removeClass('checked');
    }
  });
  $('label[data-checkbox]').children('input[type=checkbox][checked]').parent().parent().addClass('checked');
  //  =====================
  // evevnts
  //  =====================
  // input price mask
  $('#min-price').inputmask('99');
  $('#max-price').inputmask({ alias: 'decimal', groupSeparator: ' ', });
  //  =====================
  // projects
  //  =====================
  // partners slider
  new Swiper('#partners-slider', {
    grabCursor: true,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
    },
    mousewheel: true,
    spaceBetween: 20,
    breakpoints: {
      // when window width is >= 768px
      768: {
        // autoHeight: false,
        slidesPerView: 2,
        spaceBetween: -30,
      },
      // when window width is >= 1920px
      1920: {
        // autoHeight: false,
        slidesPerView: 3,
        spaceBetween: -30,
      },
    },
  });
  //  =====================
  // contacts
  //  =====================
  // map
  ymaps.ready(init);
  function init() {
    var map = new ymaps.Map('map', {
      center: [55.756118, 37.625810],
      zoom: 13,
      controls: [],
    },
      {
        suppressMapOpenBlock: true,

      }),
      showRoom2 = new ymaps.Placemark([55.753507, 37.647160], {},
        {
          iconLayout: 'default#image',
          iconImageHref: '/../svg/map-marker.svg',
          iconImageSize: [20, 28],
          iconImageOffset: [-3, -42]
        });
    map.geoObjects.add(showRoom2);
  }
  // form
  var
    inputTel = document.querySelector('input[type="tel"]'),
    maskTel = new Inputmask('+7(999)-999-99-99');
  maskTel.mask(inputTel);
  new window.JustValidate('.contacts-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      tel: {
        required: true,
        function: (name, val) => {
          const phoneNumber = inputTel.inputmask.unmaskedvalue();
          return Number(phoneNumber) && phoneNumber.length === 10;
        }
      }
    },
    colorWrong: '#7943a4',
    focusWrongField: true,
    messages: {
      name: {
        minLength: 'Имя должно содержать 2-15 символов',
        required: 'Укажите Ваше имя'
      },
      tel: {
        function: 'Введите корректный телефонный номер',
        required: 'Укажите Ваш телефон',
      },
    },
  });
  // glabal scroll
  $('a[data-scroll]').click(function (e) {
    e.preventDefault();
    const OFFSET = 0,
      HEADER_PHONE = 45,
      HEADER_TABLET = 100;
    let target = '#about-us', offset, _href;
    _href = $(this).attr('href');
    if ($(this).hasClass('header-logo') || $(this).hasClass('footer-logo')) {
      offset = 0;
    } else if (_href != '#') {
      target = $(_href);
      offset = $(target).offset().top - OFFSET;
      if ($(window).width() < 768) {
        offset -= HEADER_PHONE;
      } else {
        offset -= HEADER_TABLET;
      }
    } else {
      console.error('Anchor not defined!');
    }


    $('body, html').animate({
      scrollTop: offset
    }, 800);


    $('.hero__btn-subscribe').click(function (e) {
      e.preventDefault();
      const HEADER_PHONE = 45,
        HEADER_TABLET = 100;
      let offset = $('#contacts').offset().top;
      if ($(window).width() < 768) {
        offset -= HEADER_PHONE;
      } else {
        offset -= HEADER_TABLET;
      }
      $('body, html').animate({
        scrollTop: offset
      }, 2000);
    });

    // call burger click to hide burger menu
    if (($(this).hasClass('header-menu__link') && ($(window).width() < parseInt(MEDIA_LAPTOP)))) {
      $('.burger').click();
    }
  });
});




