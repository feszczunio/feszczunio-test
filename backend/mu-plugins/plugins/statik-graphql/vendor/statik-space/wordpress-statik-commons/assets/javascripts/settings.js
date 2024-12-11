;(function($) {
  if (false === window.hasOwnProperty('statikCommon')) {
    return; //Break load scripts if required config does not exists
  }

  window.statikCommon = window.statikCommon || {};
  window.statikCommon.instance = {
    /**
     * Commons configuration.
     */
    debug: parseInt(window.statikCommon.config.debug),
    nonce: window.statikCommon.config.nonce,
    assetsUrl: window.statikCommon.config.assetsUrl,

    /**
     * jQuery elements.
     */
    $wrapper: $(document).find('#statik'),
    $multipleSelects: $(document).find('#statik select[data-multiple]'),
    $passwordInputs: $(document).find(
        '#statik div:has(> input.statik-is-password)',
    ),
    $repeaters: $(document).find('#statik .js-repeater-wrapper'),
    $confirm: $(document).find('#statik .js-confirm-wrapper'),

    /**
     * Support for async selects. Method call REST API endpoint for get all available options.
     */
    handleAsyncSelectsFields() {
      this.$wrapper.find('select[data-async]').each((index, element) => {
        let $this = $(element),
            currentValue = $this.data('current-value'),
            $loader = $this.parent();

        $.ajax({
          url: $this.data('async'),
          method: 'GET',
          beforeSend: (xhr) => {
            $loader.addClass('loading');
            xhr.setRequestHeader('X-WP-Nonce', this.nonce);
          },
          error: (xhr) => this.debug && console.log(xhr),
          success: (xhr) => {
            typeof xhr === 'object' &&
            xhr.forEach((item) => {
              if (item.value === currentValue) {
                item['selected'] = true;
              }
              $this.append($('<option>', item));
            });

            if (!$this.attr('data-disabled')) {
              $this.removeAttr('disabled');
            }
          },
          complete: () => $loader.removeClass('loading'),
        });
      });
    },

    /**
     * Support for multiple select field. Add required vendors and manage field.
     */
    handleMultipleSelects() {
      if (this.$multipleSelects.length === 0) {
        return;
      }

      $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: this.assetsUrl + '/stylesheets/vendors/selectize-0.15.2.min.css',
      }).appendTo('head');

      $.getScript(
          `${this.assetsUrl}/javascripts/vendors/jquery-ui-1.13.2.min.js`,
          () => {
            $.getScript(
                `${this.assetsUrl}/javascripts/vendors/selectize-0.15.2.min.js`,
                () => {
                  this.$multipleSelects.each((index, element) => {
                    const regex = $(element).data('validation');
                    const create = $(element).data('create') === 1;

                    $(element).selectize({
                      plugins: ['remove_button', 'drag_drop'],
                      delimiter: ',',
                      persist: false,
                      mode: 'multi',
                      create: create
                          ? (input) =>
                              typeof regex === 'string' && !RegExp(regex).test(input)
                                  ? false
                                  : {value: input, text: input}
                          : false,
                    });
                  });
                },
            );
          },
      );
    },

    /**
     * Support for password field.
     */
    handlePasswordField() {
      if (this.$passwordInputs.length === 0) {
        return;
      }

      this.$passwordInputs.on('click', (event) => {
        $(event.target)
            .siblings('input')
            .val('')
            .removeAttr('disabled')
            .removeAttr('placeholder')
            .focus();
      });
    },

    /**
     * Handle repeater fieldset.
     */
    handleRepeaters() {
      if (this.$repeaters.length === 0) {
        return;
      }

      this.$repeaters.on('click', '.js-add-row', (event) => {
        event.preventDefault();

        const $repeater = $(event.currentTarget).closest('.js-repeater-wrapper');
        const lastKey =
            $repeater
                .find('.js-fields-wrapper .js-repeater-row:last-of-type')
                .data('key') || 0;

        $repeater.find('.js-fields-wrapper').append(
            $repeater
                .find('.js-template')
                .html()
                .replace(/data-template-name/g, 'name')
                .replace(/data-template-required/g, 'required')
                .replace(/template-key/g, lastKey + 1),
        );
      });

      this.$repeaters.on('click', '.js-remove-row', (event) => {
        event.preventDefault();

        $(event.currentTarget).closest('.js-repeater-row').remove();
      });
    },

    /**
     * Handle settings select.
     */
    handleSettingsSelect() {
      this.$wrapper.on('change', '#nav-select', (event) => {
        window.location.href = event.currentTarget.value;
      });
    },

    /**
     * Handle condition fieldset.
     */
    handleConditionsFieldset() {
      const handler = () => {
        const $conditionalFieldset = this.$wrapper.find(
            '.statik-grid-row[data-conditions]',
        );
        const namespace = this.$wrapper
            .find('.statik-generator[data-namespace]')
            .data('namespace');

        $conditionalFieldset.each((index, el) => {
          const $fieldset = $(el);
          const config = Object.entries($fieldset.data('conditions'));
          const result = [];

          for (let [key, value] of config) {
            let negation;

            if (key.substring(key.length - 1) === '!') {
              key = key.substring(0, key.length - 1);
              negation = true;
            } else {
              negation = false;
            }

            const $field = this.$wrapper.find(`[name="${namespace}[${key}]"]`);

            if ($field.length) {
              if ($field.is(':checkbox')) {
                result.push(
                    negation
                        ? $field.is(':checked') !== !!value
                        : $field.is(':checked') === !!value,
                );
              } else {
                result.push(
                    negation ? $field.val() !== value : $field.val() === value,
                );
              }
            }
          }

          if (result.filter((value) => value).length === config.length) {
            $fieldset.css('display', 'grid');
            $fieldset.find('input, select, textarea').each((index, el) => {
              const $el = $(el);

              $el
                  .attr('required', $el.attr('data-required'))
                  .removeAttr('data-required')
                  .attr('name', $el.attr('data-name'))
                  .removeAttr('data-name');
            });
          } else {
            $fieldset.css('display', 'none');
            $fieldset.find('input, select, textarea').each((index, el) => {
              const $el = $(el);

              $el
                  .attr('data-required', $el.attr('required'))
                  .removeAttr('required')
                  .attr('data-name', $el.attr('name'))
                  .removeAttr('name');
            });
          }
        });
      };

      this.$wrapper.on('change', 'form', handler);
      handler();
    },

    /**
     * Handle confirm elements.
     */
    handleConfirm() {
      if (this.$confirm.length === 0) {
        return;
      }

      $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: `${this.assetsUrl}/stylesheets/vendors/jquery-confirm-3.3.4.min.css`,
      }).appendTo('head');

      $.getScript(
          `${this.assetsUrl}/javascripts/vendors/jquery-confirm-3.3.4.min.js`,
      );
    },
  };

  window.statikCommon.instance.handleAsyncSelectsFields();
  window.statikCommon.instance.handleMultipleSelects();
  window.statikCommon.instance.handlePasswordField();
  window.statikCommon.instance.handleRepeaters();
  window.statikCommon.instance.handleSettingsSelect();
  window.statikCommon.instance.handleConditionsFieldset();
  window.statikCommon.instance.handleConfirm();
})(window.jQuery);
