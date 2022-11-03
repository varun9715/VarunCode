jQuery(window).on('load resize', function () {

    tableHeading = jQuery('.table_wrapper .table thead th');
    tableRow = jQuery('.table_wrapper .table tbody tr');

    var optionTexts = [];
    tableHeading.each(function () {
        optionTexts.push(jQuery(this).text());
    });

    if (768 > jQuery(window).width()) {
        tableRow.each(function () {
            jQuery(this).find('td').each(function (index) {
                jQuery(this).attr('data-label', optionTexts[index++]);
            });
        });
    }

});
