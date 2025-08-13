module Api
  class CoursesController < ApplicationController
    before_action :set_service

    def index
      render json: @service.list_courses
    end

  def show
    course = Course.find_by(id: params[:id])
    if course
      render json: course
    else
      render json: { error: "Curso não encontrado." }, status: :not_found
    end
  end


    def create
      course = @service.add_course(course_params)
      if course.persisted?
        render json: course, status: :created
      else
        render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      course = @service.update_course(params[:id], course_params)
      if course.errors.any?
        render json: { errors: course.errors.full_messages }, status: :unprocessable_entity
      else
        render json: course
      end
    end

    def destroy
      @service.delete_course(params[:id])
      render json: { message: "O curso foi deletado com sucesso!" }
    end

    private

    def set_service
      @service = CourseService.new
    end

    def course_params
      params.require(:course).permit(:title, :description, :end_date)
    end
  end
end
