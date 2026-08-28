package events

// OrderEvent payload sent across GCP Pub/Sub for asynchronous downstream processing
type OrderEvent struct {
	EventID   string  `json:"event_id"`
	EventType string  `json:"event_type"` // e.g., "ORDER_PLACED", "ORDER_READY"
	OrderID   string  `json:"order_id"`
	UserID    string  `json:"user_id"`
	CampusID  string  `json:"campus_id"`
	Total     float64 `json:"total"`
	Timestamp int64   `json:"timestamp"`
}
