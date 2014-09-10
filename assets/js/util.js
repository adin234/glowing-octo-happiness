var template = function (templateHTML, data) {
    for(var x in data) {
        templateHTML = templateHTML.replace(new RegExp('{{'+x+'}}', 'gi'), data[x]);
    }

    return templateHTML;
};