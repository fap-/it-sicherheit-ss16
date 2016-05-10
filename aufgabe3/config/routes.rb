Rails.application.routes.draw do

  get     'login'     =>  'sessions#new'
  post    'login'     =>  'sessions#create'
  delete  'logout'    =>  'sessions#destroy'

  resources :users
  resources :account_activations, only: [:edit]

	root :to => "sessions#new"
end
