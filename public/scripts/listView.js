(function(module) {

  var listView = {};

  var $itemInput = $('#new-item');
  var $addButton = $('#add-button');
  var $deleteAllButton = $('#delete-all-button');
  var $toGetHolder = $('#to-get');
  var $boughtHolder = $('#bought');

  listView.createNewItemElement = function(itemString) {
    var render = Handlebars.compile($('#listItem-template').html());
    return $(render({item: itemString}))[0];
  };

  listView.addItem = function() {
    var listItem = listView.createNewItemElement($itemInput.val());

    if ($itemInput.val() === '') {
      alert('Please enter an item.');
    } else {
      $toGetHolder.prepend(listItem);
      listView.bindItemEvents(listItem, listView.itemBought);
      var id = JSON.parse(localStorage.getItem('userData')).id;
      var query = '(' + id + ', \'' + $itemInput.val() + '\')';
      listController.addIngredients(query);
    }
    $itemInput.val() === '';
  };

  listView.populateFromDatabase = function(data) {
    data.forEach(function(ele) {
      var listItem = listView.createNewItemElement(ele);
      $toGetHolder.prepend(listItem);
      listView.bindItemEvents(listItem, listView.itemBought);
    });
  };

  listView.populateList = function(item) {
    var listItem = listView.createNewItemElement(item);
    $toGetHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
  };

  listView.deleteItem = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
    var text = $(this).prev().text();
    listController.deleteIngredients(text);
  };

  listView.deleteAll = function() {
    var id = JSON.parse(localStorage.getItem('userData')).id;
    listController.deleteAllIngredients(id);
    listController.clearIngredients();
  };

  listView.itemBought = function() {
    var listItem = this.parentNode;
    $boughtHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemToGet);
  };

  listView.itemToGet = function() {
    var listItem = this.parentNode;
    $toGetHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
  };

  listView.bindItemEvents = function(ListItem, checkboxEventHandler) {
    var checkbox = ListItem.querySelector('input[type=checkbox]');
    var deleteButton = ListItem.querySelector('button.delete');

    deleteButton.addEventListener('click', listView.deleteItem);

    checkbox.addEventListener('change', checkboxEventHandler);
  };

  $addButton.on('click', listView.addItem);

  $deleteAllButton.on('click', listView.deleteAll);

  $itemInput.on('keypress', function(event) {
    if (event.keyCode == 13) {
      $addButton.click();
      return false;
    }
    return true;
  });

  $toGetHolder.children().each(function(ele) {
    listView.bindItemEvents(ele, listView.itemBought);
  });

  $boughtHolder.children().each(function(ele) {
    listView.bindItemEvents(ele, listView.itemToGet);
  });

  module.listView = listView;
})(window);
