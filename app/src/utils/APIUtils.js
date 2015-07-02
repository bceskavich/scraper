import * as $ from 'jquery';

export function getClientId(onSuccess) {
  $.ajax({
    url: '/get_client_id',
    dataType: 'json'
  }).done(onSuccess);
}
