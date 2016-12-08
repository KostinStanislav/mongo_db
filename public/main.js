var update = document.getElementsByClassName('update');
var del = document.getElementsByClassName('delete');
//UPDATE
for (var i=0;i<update.length;i++){
update[i].addEventListener('click', function (event) {
  if (confirm("Ти добре подумав?P.S.дані в таблиці заміняться на захардкоджені,ID залишиться без змін")) {
 fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      '_id': event.target.id,
      'name': 'No name',
      'surname': 'No surname',
      'email':'No email',
      'age':'No age'
    })
  })
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data => {
    console.log(data);
    window.location.reload(true);
  });
  }else{
  alert("Ну і не треба!");
}
});
}

//DELETE
for (var i=0;i<del.length;i++){
del[i].addEventListener('click', function (event) {
 if (confirm("Впевнені що хочете видалити з бази?")) {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': event.target.id
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data => {
    console.log(data);
    window.location.reload(true);
  });
}else{
  alert("Правильно нефіг!");
}});
}