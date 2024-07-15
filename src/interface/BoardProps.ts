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
  tag: string
  title: string
  content: string
  comments_count: number
  user_name: string
  created_at: string
  likes_count: number
  views_count: number
}

export type { BoardProps, BoardTitleProps, BoardListProps }