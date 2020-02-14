class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]

  # GET /teams
  # GET /teams.json
  def index
    teams = Team.all
    render json: teams
  end

  # GET /teams/1
  # GET /teams/1.json
  def show
    render json: @team
  end

  # GET /teams/new
  def new
    team = Team.new
  end

  # GET /teams/1/edit
  def edit
  end

  # POST /teams
  # POST /teams.json
  def create
    team = Team.new(team_params)
    if team.save
      render json: team
    else
      render json: team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teams/1
  # PATCH/PUT /teams/1.json
  def update
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    leagues = League.all
    @team.destroy
      render json: leagues
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:name, :logo, :nickname, :stadium, :manager, :year_founded, :league_id)
    end
end
