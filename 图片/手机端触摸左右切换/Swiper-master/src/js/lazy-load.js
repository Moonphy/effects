/*=========================
  Images Lazy Loading
  ===========================*/
s.lazy = {
    initialImageLoaded: false,
    loadImageInSlide: function (index, loadInDuplicate) {
        if (typeof index === 'undefined') return;
        if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
        if (s.slides.length === 0) return;
        
        var slide = s.slides.eq(index);
        var img = slide.find('img.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
        if (img.length === 0) return;

        img.each(function () {
            var _img = $(this);
            _img.addClass('swiper-lazy-loading');

            var src = _img.attr('data-src');

            s.loadImage(_img[0], src, false, function () {
                _img.attr('src', src);
                _img.removeAttr('data-src');
                _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                slide.find('.swiper-lazy-preloader, .preloader').remove();
                if (s.params.loop && loadInDuplicate) {
                    var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                    if (slide.hasClass(s.params.slideDuplicateClass)) {
                        var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                        s.lazy.loadImageInSlide(originalSlide.index(), false);
                    }
                    else {
                        var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                        s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                    }
                }
                s.emit('onLazyImageReady', s, slide[0], _img[0]);
            });
            
            s.emit('onLazyImageLoad', s, slide[0], _img[0]);
        });
            
    },
    load: function () {
        if (s.params.watchSlidesVisibility) {
            s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                s.lazy.loadImageInSlide($(this).index());
            });
        }
        else {
            if (s.params.slidesPerView > 1) {
                for (var i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
                    if (s.slides[i]) s.lazy.loadImageInSlide(i);
                }
            }
            else {
                s.lazy.loadImageInSlide(s.activeIndex);    
            }
        }
        if (s.params.lazyLoadingInPrevNext) {
            var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
            if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());

            var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
            if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
        }
    },
    onTransitionStart: function () {
        if (s.params.lazyLoading) {
            if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                s.lazy.load();
            }
        }
    },
    onTransitionEnd: function () {
        if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
            s.lazy.load();
        }
    }
};
