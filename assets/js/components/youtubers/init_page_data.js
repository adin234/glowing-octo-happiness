/* global
    page_data : true,
    gamesAutocompleteArray
*/

'use strict';
var gameNames = [];

page_data = $.parseJSON(page_data);

page_data.games.forEach(function(item) {
    gamesAutocompleteArray.push({value: item.name, data: item});
    gameNames.push(item.name);
    if(!~gameNames.indexOf(item.chinese)) {
        gamesAutocompleteArray.push({value: item.chinese, data: item});
    }
});
