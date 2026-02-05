(function () {
  function getOrCreateSessionId(key) {
    try {
      var existing = localStorage.getItem(key);
      if (existing) return existing;
      var id =
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(key, id);
      return id;
    } catch (_err) {
      return "";
    }
  }

  function getCheckedValues(groupName) {
    return Array.from(
      document.querySelectorAll(
        'input[type="checkbox"][name="' + groupName + '"]:checked'
      )
    ).map(function (input) {
      return input.value;
    });
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_err) {
      // ignore write failures (private mode / storage disabled)
    }
  }

  function loadJson(key, fallbackValue) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallbackValue;
      return JSON.parse(raw);
    } catch (_err) {
      return fallbackValue;
    }
  }

  function saveDateValue(inputSelector, key) {
    var input = document.querySelector(inputSelector);
    if (!input) return;

    try {
      localStorage.setItem(key, input.value || '');
    } catch (_err) {
      // ignore
    }
  }

  window.MoonshineSelections = {
    getOrCreateSessionId: getOrCreateSessionId,
    getCheckedValues: getCheckedValues,
    saveJson: saveJson,
    loadJson: loadJson,
    saveDateValue: saveDateValue,
  };
})();
