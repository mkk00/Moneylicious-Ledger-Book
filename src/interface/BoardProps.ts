interface BoardProps {
  id: number
  name: string
}

interface BoardTitleProps {
  title: string
}

interface BoardListProps extends BoardTitleProps {
  id: string
  board_id: number
  user_id: string
  tag: string
  content: string
  comments_count: number
  user_name: string
  created_at: string
  likes_count: number
  views_count: number
}

interface CommentProps extends CommentTextProps {
  id: string
  board_id: string
  user_id: string
  created_at: Date
  parent_id: string | null
  is_author: boolean
  userinfo: {
    username: string
    image_url: string
    message: string
  }
}

interface CommentTextProps {
  content: string
  recontent: string
}

export type {
  BoardProps,
  BoardTitleProps,
  BoardListProps,
  CommentProps,
  CommentTextProps
}
