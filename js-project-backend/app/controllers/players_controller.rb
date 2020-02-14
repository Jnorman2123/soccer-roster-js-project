class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :edit, :update, :destroy]

  # GET /players
  # GET /players.json
  def index
    players = Player.all
    render json: players
  end

  # GET /players/1
  # GET /players/1.json
  def show
    render json: @player
  end

  # GET /players/new
  def new
    player = Player.new
  end

  # GET /players/1/edit
  def edit
  end

  # POST /players
  # POST /players.json
  def create
    player = Player.new(player_params)
    if player.save
      render json: player
    else
      render json: player.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /players/1
  # PATCH/PUT /players/1.json
  def update
    if @player.update(player_params)
      render json: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /players/1
  # DELETE /players/1.json
  def destroy
    leagues = League.all
    @player.destroy
    render json: leagues
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def player_params
      params.require(:player).permit(:name, :image, :nationality, :appearances, :goals, :market_value, :jersey_number, :age, :team_id)
    end
end
