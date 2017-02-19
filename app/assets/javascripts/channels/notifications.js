function add_push_up_notifications_subscribe() {
  if (App.cable.subscriptions['subscriptions'].length > 0) {
    return false;
  }

  App.notifications = App.cable.subscriptions.create("NotificationsChannel", {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      update_issues_counter(data['issue_data']);
      // Called when there's incoming data on the websocket for this channel
      $('.wrapper').append(data.message);
      img_to_svg_convert();
    }
  });
}

function update_issues_counter(issue_data) {
  if (issue_data){
    $.each(issue_data, function(key, val){
      $(".head_title_middle span." + key + " span").text(val);
    });
  };
};

function remove_subscribe_push_up_notifications() {
  if (App.notifications) {
    App.notifications.unsubscribe();
  }
};