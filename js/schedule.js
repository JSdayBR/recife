(function($) {
    $(document).ready(function() {
        $(window).scroll(function() {
            var scroll = $(this).scrollTop();
            var topOffset = header.height() + $('.track-header').height();

            $('.slot').each(function() {
                var currentPosition = $(this).offset().top - scroll;
                var offsetActivator = topOffset + $(this).find('.slot-title').height();
                if (currentPosition <= offsetActivator && currentPosition >= 0) {
                    $('.track-header.sticky').find('.slot-detail').html($(this).data('slotDetail'));
                }
            });
        });

        var navHeight = $('#top-header').height();
        var headerHeight = $('.track-header').first().height();
        $('.stick-header').stick_in_parent({sticky_class: 'sticky', offset_top: navHeight});
        $('.stick-label').stick_in_parent({offset_top: navHeight + headerHeight});

        $(window).resize(function() {
            if ($(window).width() < 768) {
                $('.same-height').css('height', '100%');
                $('.timeslot-label').addClass('stick-label');
            } else {
                $('.timeslot-label').removeClass('stick-label');
                if (container.hasClass('st-menu-open')) {
                    container.removeClass('st-menu-open');
                    $('body').css('overflow', 'auto');
                }
                equalheight('.same-height');
            }
        });

        $(function() {
            if(window.location.href.indexOf("schedule") > -1 && window.location.hash) {
                var hash = window.location.hash;
                $(hash).click();
            }
        });

        $('.track-header').each(function() {
            var scheduleFirstSlotText;
            var slot = $(this).closest('.schedule-table').find('.slot').first();
            var hasSlot = slot && slot.length > 0;
            while (hasSlot && scheduleFirstSlotText === undefined) {
                scheduleFirstSlotText = slot.data('slotDetail');
                slot = slot.next();
            }
            $(this).find('.slot-detail').html(scheduleFirstSlotText);
        });

        $('.slot').click(function() {
            location.hash = $(this).attr('id');
        });
    });
})(jQuery);
