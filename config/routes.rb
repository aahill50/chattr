Chattr::Application.routes.draw do
  root to: 'posts#index'
  
  resources :users, except: [:index, :destroy] do
    resources :posts, only: [:new]
  end
  
  resources :posts, except: [:new]
  
  resource :session, only: [:new, :create, :destroy]
end
