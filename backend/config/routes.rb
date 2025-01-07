Rails.application.routes.draw do
  resources :users, only: [:index]

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions'
  }

  get "up" => "rails/health#show", as: :rails_health_check

  # root "posts#index"
end
