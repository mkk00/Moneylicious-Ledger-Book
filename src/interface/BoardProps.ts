interface BoardProps {
  id: number
  name: string
}

interface BoardTitleProps {
  title: string
}

interface BoardListProps {
  board_id: number
  tag: BoardProps
  title: string
  comments_count: number
  user_name: string
  created_at: string
  likes_count: number
}

export type { BoardProps, BoardTitleProps, BoardListProps }
