LiveChat::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root :to => 'pages#index'
  get 'chat' => 'pages#chat'
  get 'week' => 'pages#week'
  get 'day' => 'pages#day'
  get 'month' => 'pages#month'
  get 'adminSettings' => 'pages#adminSettings'
end
