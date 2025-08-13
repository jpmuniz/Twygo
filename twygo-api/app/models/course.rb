class Course < ApplicationRecord
  has_many_attached :videos

  validates :title, presence: true
  validates :end_date, presence: true

  scope :active, -> { where('end_date >= ?', Date.current) }

  def total_video_size
    videos.inject(0) { |sum, v| sum + (v.blob.byte_size || 0) }
  end
end