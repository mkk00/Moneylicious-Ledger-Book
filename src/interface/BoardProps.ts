interface BoardProps {
  id: number
  name: string
}

interface BoardTitleProps {
  title: string
}

interface BoardListProps {
  id: string
  board_id: number
  user_id: string
  tag: string
  title: string
  content: string
  comments_count: number
  user_name: string
  created_at: string
  likes_count: number
  views_count: number
}

interface CommentProps {
  id: string
  board_id: string
  user_id: string
  content: string
  created_at: Date
  parent_id: string
  is_author: boolean
}

interface CommentTextProps {
  content: string
}

export type {
  BoardProps,
  BoardTitleProps,
  BoardListProps,
  CommentProps,
  CommentTextProps
}
