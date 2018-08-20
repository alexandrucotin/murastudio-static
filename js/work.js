
var work = {

    init: function () {
        work.init_category();
        work.get_work();
        $('.category_option').css('font-weight', 'normal');
        $('#category_all').css('font-weight', 'bold');
    },

    init_category: function () {
        $('#category_all').on('click', function () {
            $('.category_option').css('font-weight', 'normal');
            $('#category_all').css('font-weight', 'bold');
            work.shuffle.filter();
        });
        $('#category_interiors').on('click', function () {
            $('.category_option').css('font-weight', 'normal');
            $('#category_interiors').css('font-weight', 'bold');
            work.shuffle.filter('interiors');
        });
        $('#category_architecture').on('click', function () {
            $('.category_option').css('font-weight', 'normal');
            $('#category_architecture').css('font-weight', 'bold');
            work.shuffle.filter('architecture');
        });
        $('#category_retail').on('click', function () {
            $('.category_option').css('font-weight', 'normal');
            $('#category_retail').css('font-weight', 'bold');
            work.shuffle.filter('retail');
        });
        $('#category_commercial').on('click', function () {
            $('.category_option').css('font-weight', 'normal');
            $('#category_commercial').css('font-weight', 'bold');
            work.shuffle.filter('commercial');
        });
    },

    get_work: function () {
        console.log("inainte apel getJSON");
        $.getJSON("../work/config.json", readPosts);
        console.log("dupa apel getJSON");
    },

    format_work: function (response) {
        var work_list = response.work;
        if (work_list) {
            var new_list = [];
            var i, current, title, date, text, image, path;
            for (i = 0; i < work_list.length; i++) {
                current = work_list[i];
                new_list[i] = {
                    title: current[1],
                    year: work.get_year(current[2]),
                    groups: work.get_groups(
                        current[3],
                        current[4],
                        current[5],
                        current[6]
                    ),
                    categories: work.get_categories(
                        current[3],
                        current[4],
                        current[5],
                        current[6]
                    ),
                    image: current[7],
                    path: current[8] + "/post.html"
                };
            }
            response.work = new_list;
            return response;
        }
        return [];
    },

    get_year: function (date) {
        date = date.split(' ')[0].split('-');
        return date[0];
    },

    get_groups: function (interiors, architecture, retail, commercial) {
        var groups = '[';
        if (interiors == 1)
            groups += '"interiors"';
        if (architecture == 1) {
            if (groups.length > 1)
                groups += ', ';
            groups += '"architecture"';
        }
        if (retail == 1) {
            if (groups.length > 1)
                groups += ', ';
            groups += '"retail"';
        }
        if (commercial == 1) {
            if (groups.length > 1)
                groups += ', ';
            groups += '"commercial"';
        }
        groups += ']';
        return groups;
    },

    get_categories: function (interiors, architecture, retail, commercial) {
        var categories = '';
        if (interiors == 1)
            categories += 'interiors';
        if (architecture == 1) {
            if (categories.length > 0)
                categories += ', ';
            categories += 'architecture';
        }
        if (retail == 1) {
            if (categories.length > 0)
                categories += ', ';
            categories += 'retail';
        }
        if (commercial == 1) {
            if (categories.length > 0)
                categories += ', ';
            categories += 'commercial';
        }
        return categories;
    }

};

function readPosts(data) {
    var work_list_1 = data;
    response = work.format_work(work_list_1);
    $.get('../templates.html', function (content) {
        var template = $(content).filter('#get_work').html();
        $('#work').html(Mustache.render(template, response));
        setTimeout(function () {
            Shuffle.options.speed = 750;
            work.shuffle = new Shuffle($('#work'), { itemSelector: '.all', sizer: '#work' });
        }, 1000);
    });
}


$(document).ready(work.init());
