import './Menu.scss';

type Checkbox = {
  id: string;
  label: string;
};

type Topic = {
  id: string;
  imgSrc: string;
  label: string;
}

const checkboxes: Checkbox[] = [
  {
    id: 'noPercent',
    label: 'no percent',
  },
  {
    id: 'noGui',
    label: 'no gui',
  },
];

const topics: Topic[] = [
  {
    id: 'default',
    imgSrc: 'b&w.jpg',
    label: 'B&W',
  },
  {
    id: 'colors',
    imgSrc: 'colors.jpg',
    label: 'Colors',
  },
  {
    id: 'classical_arts',
    imgSrc: 'classical-arts.jpg',
    label: 'Classical arts',
  },
  {
    id: 'urban',
    imgSrc: 'urban.jpg',
    label: 'Urban',
  },
  {
    id: 'nature_seasons',
    imgSrc: 'nature-seasons.jpg',
    label: 'Nature',
  },
  {
    id: 'anime',
    imgSrc: 'anime.jpg',
    label: 'Anime',
  },
  {
    id: 'cyberpunk',
    imgSrc: 'cyberpunk.jpg',
    label: 'Cyberpunk',
  },
  {
    id: 'synthwave',
    imgSrc: 'synthwave.jpg',
    label: 'Synthwave',
  },
  {
    id: 'vaporwave',
    imgSrc: 'vaporwave.jpg',
    label: 'Vaporwave',
  },
];

const pathToImagesForTopics = 'imagesForTopics';

$(() => {
  const $checkboxesWrapper = $('.js-checkboxes-wrapper');
  const $topicsWrapper = $('.js-topics-wrapper');

  const $menu = $('.js-menu');
  const $menuButton = $('.js-menu-button');
  const $menuButtonApply = $('.js-menu-button-apply');

  checkboxes.forEach((checkboxCur) => {
    const { id, label } = checkboxCur;

    const $wrapper = $('<div class="MenuCheckbox js-checkbox-wrapper"></div>');

    const $label = $(`<label for="${id}">${label}</label>`);
    const $checkbox = $(`<input id="${id}" type="checkbox" />`);

    $wrapper.append($label);
    $wrapper.append($checkbox);

    $checkboxesWrapper.append($wrapper);
  });

  topics.forEach((topicCur) => {
    const { label, imgSrc } = topicCur;

    const imageSrc = `${pathToImagesForTopics}/${imgSrc}`;

    const $wrapper = $(`<div class="MenuTopic js-menu-topic"></div>`);

    const $img = $(`<img src="${imageSrc}" alt="" class="MenuTopicImage" />`);
    const $label = $(`<div class="MenuTopicLabel">${label}</div>`);

    $wrapper.append($img);
    $wrapper.append($label);

    $wrapper.data('topic', topicCur);

    $topicsWrapper.append($wrapper);
  });

  $('.js-menu-topic').on('click', (e) => {
    const $this = $(e.currentTarget);
    const activeTopic = $('.js-menu-topic.isActive');

    activeTopic.removeClass('isActive');
    $this.addClass('isActive');
  });

  $menuButton.on('click', () => {
    if ($menu.is(':hidden')) {
      $menu.css('display', 'flex');
    } else {
      $menu.css('display', 'none');
    }
  });

  $menuButtonApply.on('click', () => {
    const noPercentValue = $('#noPercent').is(':checked');
    const noGuiValue = $('#noGui').is(':checked');
    const percentUpdate = $('#input-update-speed').val();

    let params = '?';

    if (noPercentValue) {
      params += '&no-percent';
    }

    if (noGuiValue) {
      params += '&no-gui';
    }

    if (percentUpdate !== '100') {
      params += `&percent-update-speed=${percentUpdate}`;
    }

    const $topic = $('.js-menu-topic.isActive');

    let preset = 'default';

    if ($topic.length) {
      preset = $topic.data('topic').id;
    }

    if (params[1] === '&') {
      params = params.replace('&', '');
    }

    const { href } = window.location;
    const hrefWithoutParams = href.split('?')[0];

    window.location.href = `${hrefWithoutParams}${params}&preset=${preset}`;
  });
});
