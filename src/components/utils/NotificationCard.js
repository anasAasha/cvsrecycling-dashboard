import React from 'react';

const NotificationCard = () => {
  return (
    <div className="card overflow-hidden">
      <div className="card-header bg-body-tertiary">
        <div className="row flex-between-center">
          <div className="col-sm-auto">
            <h5 className="mb-1 mb-md-0">Your Notifications</h5>
          </div>
          <div className="col-sm-auto fs--1">
            <Link className="font-sans-serif" to="">Mark all as read</Link>
            <Link className="font-sans-serif ms-2 ms-sm-3" to="" data-bs-toggle="modal">
              Notification settings
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body fs--1 p-0">
        {/* Notification items go here */}
        <NotificationItem
          avatarSrc="../../assets/img/team/1.jpg"
          notificationText="Announcing the winners of the <strong>The only book awards</strong> decided by you, the readers. Check out the champions and runners-up in all 21 categories now!"
          time="📢 Just Now"
        />
        <NotificationItem
          avatarSrc="../../assets/img/team/2.jpg"
          notificationText="Last chance to vote in <strong>The 2018 Falcon Choice Awards</strong>! See what made it to the Final Round and help your favorites take home the win. Voting closes on November 26"
          time="🏆 15m"
        />
        {/* Add more NotificationItem components for other notifications */}
      </div>
    </div>
  );
};

const NotificationItem = ({ avatarSrc, notificationText, time }) => {
  return (
    <Link className="border-bottom-0 notification rounded-0 border-x-0 border-300" to="">
      <div className="notification-avatar">
        <div className="avatar avatar-xl me-3">
          <img className="rounded-circle" src={avatarSrc} alt="notification" />
        </div>
      </div>
      <div className="notification-body">
        <p className="mb-1" dangerouslySetInnerHTML={{ __html: notificationText }} />
        <span className="notification-time">
          <span className="me-2" role="img" aria-label="Emoji">
            {time}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default NotificationCard;
