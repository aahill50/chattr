Chattr::Application.routes.draw do
  root to: 'posts#index'
  resources :users, except: [:index, :destroy] do
    resources :posts, only: [:new]
  end
  resources :posts
  resource :user_follows, only: [:create, :destroy]
  resource :session, only: [:new, :create, :destroy]
  post 'users/search', to: 'users#search', as: 'user_search'

end
