Warden::Manager.after_authentication do |user, auth, opts|
  if user.model_name.name.downcase == 'user'
    Statistic.create(user: user)
  end
end

Warden::Manager.after_set_user do |user, auth, opts|
  if user.model_name.name.downcase == 'user'
    Statistic.where(user: user).last.update(updated_at: Time.now)
  end
end
