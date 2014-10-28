Chattr::Application.routes.draw do
  root to: 'posts#index'

  resources :users, except: [:index, :destroy] do
    resources :posts, only: [:new]
  end

  resources :posts, except: [:new]

  resource :user_follows, only: [:create, :destroy]

  resource :session, only: [:new, :create, :destroy]

end
