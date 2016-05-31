Rails.application.routes.draw do

  get 'password_resets/new'

  get 'password_resets/edit'

  get     'login'     =>  'sessions#new'
  post    'login'     =>  'sessions#create'
  delete  'logout'    =>  'sessions#destroy'

  resources :users #, except: [:delete]
  # get     'users/delete/:id' =>  'users#destroy', as: "user_delete"
  

  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :edit, :create, :update]
  resources :email_changes, only: [:edit]

	root :to => "sessions#new"
end
