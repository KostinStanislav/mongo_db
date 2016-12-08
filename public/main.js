var update = document.getElementsByClassName('update');
var del = document.getElementsByClassName('delete');
for (var i=0;i<update.length;i++){
update[i].addEventListener('click', function (event) {
  console.log(event.target.id);
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
});
}


for (var i=0;i<del.length;i++){
del[i].addEventListener('click', function (event) {
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
});
}