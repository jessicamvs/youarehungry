(function(module) {

  var listView = {};

  var $itemInput = $('#new-item');
  var $addButton = $('#add-button');
  var $toGetHolder = $('#to-get');
  var $boughtHolder = $('#bought');

  // create new list item
  listView.createNewItemElement = function(itemString) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('input');
    var label = document.createElement('label');
    var editInput = document.createElement('input');
    var deleteButton = document.createElement('button');

    //each element needs modifying
    checkbox.type = 'checkbox';
    editInput.type = 'text';

    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    label.innerText = itemString;

    //append element to each list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  //add a new item
  listView.addItem = function() {
    //create a new li with the input text from new item
    var listItem = listView.createNewItemElement($itemInput.val());

    if ($itemInput.val() === '') {
      console.log('RUNNING ADD ITEM NO ENTRY');
      alert('Please enter an item.');
    } else {
      //append list item to $toGetHolder
      console.log('SENDING TO DB?');
      $toGetHolder.prepend(listItem);
      listView.bindItemEvents(listItem, listView.itemBought);
      console.log('ingredient to add: ', $itemInput.val());
      var id = JSON.parse(localStorage.getItem('userData')).id;
      var query = '(' + id + ', \'' + $itemInput.val() + '\')';
      listController.addIngredients(query);
    }
    $itemInput.val() === '';
  };

  listView.populateFromDatabase = function(data) {
    console.log('running populateFromDatabase', data);
    data.forEach(function(ele) {
      console.log(ele);
      var listItem = listView.createNewItemElement(ele);
      $toGetHolder.prepend(listItem);
      listView.bindItemEvents(listItem, listView.itemBought);
    });
  };

  // new function to handle list population from recipe page. Can we DRY it?
  listView.populateList = function(item) {
    //create a new li with the input text from new item
    console.log('populateList', item);
    var listItem = listView.createNewItemElement(item);
    $toGetHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
  };

  //delete an existing item
  listView.deleteItem = function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
    var text = $(this).prev().text();
    console.log('In deleteItem function');
    console.log(text);
    console.log(typeof text);
    listController.deleteIngredients(text);
  };

  //mark item as bought
  listView.itemBought = function(){
    var listItem = this.parentNode;
    $boughtHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemToGet);
  };

  //mark item as to get
  listView.itemToGet = function(){
    var listItem = this.parentNode;
    $toGetHolder.prepend(listItem);
    listView.bindItemEvents(listItem, listView.itemBought);
  };

  listView.bindItemEvents = function(ListItem, checkboxEventHandler) {
    var checkbox = ListItem.querySelector('input[type=checkbox]');
    var deleteButton = ListItem.querySelector('button.delete');

    //bind deleteItem to deleteButton
    deleteButton.addEventListener('click', listView.deleteItem);

    //bind checkboxEventHandler to checkbox
    checkbox.addEventListener('change', checkboxEventHandler);
  };

  //set click event to the addItem function
  $addButton.on('click', listView.addItem);

  //press 'enter' to trigger add button
  $itemInput.on('keypress', function(event) {
    if (event.keyCode == 13) {
      $addButton.click();
      return false;
    }
    return true;
  });

  //cycle over $toGetHolder ul list items
  $toGetHolder.children().each(function(ele) {
    listView.bindItemEvents(ele, listView.itemBought);
  });

  //cycle over boughtHolder ul list items
  $boughtHolder.children().each(function(ele) {
    listView.bindItemEvents(ele, listView.itemToGet);
  });
  
  module.listView = listView;
})(window);
