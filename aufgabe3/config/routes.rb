Rails.application.routes.draw do

  get 'password_resets/new'

  get 'password_resets/edit'

  get     'login'     =>  'sessions#new'
  post    'login'     =>  'sessions#create'
  delete  'logout'    =>  'sessions#destroy'

  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :edit, :create, :update]
  resources :email_changes, only: [:edit]

	root :to => "sessions#new"
end
