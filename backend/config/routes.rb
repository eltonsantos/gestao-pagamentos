Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update] do
    get :current, on: :collection
  end

  resources :customers, only: [:index]
  
  resources :payments, only: [:index, :show, :create], defaults: { format: :json } do
    collection do
      get :top_selling_sellers
      get :sales_by_date
    end
  end

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
