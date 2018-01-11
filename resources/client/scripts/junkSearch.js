var _close = mywindow.findChild("_close");
var _query = mywindow.findChild("_query");
var _queryMarked = mywindow.findChild("queryMarked");
var _markAllForReview = mywindow.findChild("reviewAllButton");
var _selectAll = mywindow.findChild("markAllButton");
var _markSelectedForReview = mywindow.findChild("reviewSelectedButton");
var _deleteAll = mywindow.findChild("deleteAllButton");
var _deleteSelected = mywindow.findChild("deleteSelectedButton");
var _dates = mywindow.findChild("dates");
var _searchMe = mywindow.findChild("_searchMe");
var _radioButton = mywindow.findChild("radioButton");
var _empCluster = mywindow.findChild("empCluster");
var list = mywindow.findChild("_results");
var _ownerless = mywindow.findChild("ownerlessBox");
var _finalizeButton = mywindow.findChild("finalizeButton");
var cntctView = true;

_ownerless.setChecked(false);
var checked = false;
print(checked);

_close.clicked.connect(mywindow.close);
_query.clicked.connect(query);
_markAllForReview.clicked.connect(reviewAll);
_queryMarked.clicked.connect(queryMarked);
_markSelectedForReview.clicked.connect(reviewSelected);
_deleteAll.clicked.connect(deleteAll);
_deleteSelected.clicked.connect(deleteSelected);
_ownerless.clicked.connect(toggle);
_finalizeButton.clicked.connect(finalize);

function toggle() {
  if (checked) { checked = false }
  else { checked = true}
  print(checked);
}
  
list.addColumn("Contact ID",               75, 1, true, "cntct_id");
list.addColumn("First Name",              115, 1, true, "cntct_first_name");
list.addColumn("Last Name",           90, 1, true, "cntct_last_name");
list.addColumn("Active?", 115, 1, true, "cntct_active")
list.addColumn("Email",           65, 1, true, "cntct_email")
list.addColumn("Owner",         -1, 1, true, "cntct_owner_username");
list.addColumn("Date Created",         40, 3, true, "cntct_created");

function getParams() {
try {
  var params = new Object;
  if (_dates.startDate != "Invalid Date"){
    params.startDate = _dates.startDate;
  }
  if (_dates.endDate != "Invalid Date") {
    params.endDate = _dates.endDate;
  }
  if (!checked) {
    params.ownerless = "false";
  }
  if (_empCluster.id() > 0){
    params.owner = _empCluster.number;
  }
  print("params.ownerless = " + params.ownerless);
  print("params.owner = " + params.owner);
  print("params.startDate = " + params.startDate);
  print("params.endDate = " + params.endDate);
  print(_empCluster.id());
  params.pattern = _searchMe.text;
  return params;
  }
  catch (e){ print(e); }
}

function query() {
  list.clear();
  var params = getParams();
  var qry = toolbox.executeDbQuery("cleanup", "junkSearch", params);
  list.populate(qry);
  cntctView = true;
  print("cntctView = true");
}

function reviewAll() {
  print("reviewAll fucntion entered");
  var params = getParams();
  toolbox.executeDbQuery("cleanup", "markAllForReview", params);
  print("reviewAll");
  list.clear();
  query();
  print("query");
}

function queryMarked() {
  list.clear();
  print("queryMarked function entered");
  var params = getParams();
  var qry = toolbox.executeDbQuery("cleanup", "queryMarked", params);
  print("queryMarked executed")
  list.populate(qry);
  cntctView = false;
  print("cntctView = false");
}

function reviewSelected() {
  print("reviewSelected function entered");
  var selectedList = list.selectedItems();
  print("selectedList declared");
  var length = selectedList.length;
  var count = 0;
  while (count < length) {
    var currentId = selectedList[count].text(0);
    print(currentId);
    var params = new Object;
    params.id = currentId;
    toolbox.executeDbQuery("cleanup", "markOneForReview", params);
    count++;
    print("count incremented");
  }
}

function deleteAll() {
  if (cntctView) {
    print("deleteAll function entered");
    var params = getParams();
    toolbox.executeDbQuery("cleanup", "deleteAll", params);
    query();
    print("query");
  }
  else {
    print("deleteAllMarked function entered");
    var params = getParams();
    toolbox.executeDbQuery("cleanup", "deleteAllMarked", params);
    var qry = toolbox.executeDbQuery("cleanup", "queryMarked", params);
    print("queryMarked executed")
    list.populate(qry);
  }
}

function deleteSelected() {
  if (cntctView) {
    print("deleteSelected function entered");
    var selectedList = list.selectedItems();
    print("selectedList declared");
    var length = selectedList.length;
    var count = 0;
    while (count < length) {
      var currentId = selectedList[count].text(0);
      print(currentId);
      var params = new Object;
      params.id = currentId;
      toolbox.executeDbQuery("cleanup", "deleteSelected", params);
      count++;
      print("count incremented");
    }
    query();
    print("query");
  }
  else {
    print("deleteSelectedMarked function entered");
    var selectedList = list.selectedItems();
    print("selectedList declared");
    var length = selectedList.length;
    var count = 0;
    while (count < length) {
      var currentId = selectedList[count].text(0);
      print(currentId);
      var params = new Object;
      params.id = currentId;
      toolbox.executeDbQuery("cleanup", "deleteSelectedMarked", params);
      count++;
      print("count incremented");
    }
    queryMarked();
    print("queryMarked");
  }
}

function finalize() {
  print("finalize function entered");
  toolbox.executeDbQuery("cleanup", "finalize");
}