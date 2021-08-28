import numpy as np

class SIR:
    def __init__(self, beta, gamma, ):
        self.beta = beta
        self.gamma = gamma
    
    def ds_dt(self, S, I, R):
        N = S + I + R
        return -(self.beta * I * S) / N
    
    def di_dt(self, S, I, R):
        N = S + I + R
        return (self.beta * I * S) / N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I
    
    def interact(self, all, _):
        S, I, R = all
        ds_dt = self.ds_dt(S, I, R)
        di_dt = self.di_dt(S, I, R)
        dr_dt = self.dr_dt(S, I, R)
        return np.array([ds_dt, di_dt, dr_dt])

class SIRS:
    def __init__(self, beta, gamma, tau):
        self.beta = beta
        self.gamma = gamma
        self.tau = tau
    
    def ds_dt(self, S, I, R):
        N = S + I + R
        return -(self.beta * I * S) / N + self.tau * R
    
    def di_dt(self, S, I, R):
        N = S + I + R
        return (self.beta * I * S) / N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I - self.tau * R

    def interact(self, all, _):
        S, I, R = all
        ds_dt = self.ds_dt(S, I, R)
        di_dt = self.di_dt(S, I, R)
        dr_dt = self.dr_dt(S, I, R)
        return np.array([ds_dt, di_dt, dr_dt])

class SEIR:
    def __init__(self, beta, gamma, delta):
        self.beta = beta
        self.gamma = gamma
        self.delta = delta
    
    def ds_dt(self, S, E, I, R):
        N = S + I + R
        return -(self.beta * I * S) / N
    
    def de_dt(self, S, E, I, R):
        N = S + I + R
        return (self.beta * I * S) / N - self.delta * E

    def di_dt(self, S, E, I, R):
        return self.delta * E - self.gamma * I
    
    def dr_dt(self, S, E, I, R):
        return self.gamma * I

    def interact(self, all, _):
        S, E, I, R = all
        ds_dt = self.ds_dt(S, E, I, R)
        de_dt = self.de_dt(S, E, I, R)
        di_dt = self.di_dt(S, E, I, R)
        dr_dt = self.dr_dt(S, E, I, R)
        return np.array([ds_dt, de_dt, di_dt, dr_dt])

class SIRVital:
    def __init__(self, beta, gamma, lambd, mu):
        self.beta = beta
        self.gamma = gamma
        self.lambd = lambd
        self.mu = mu
    
    def ds_dt(self, S, I, R):
        N = S + I + R
        return -(self.beta * I * S) / N - self.mu * S + self.lambd * N
    
    def di_dt(self, S, I, R):
        N = S + I + R
        return (self.beta * I * S) / N - self.gamma * I - self.mu * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I - self.mu * R
    
    def interact(self, all, _):
        S, I, R = all
        ds_dt = self.ds_dt(S, I, R)
        di_dt = self.di_dt(S, I, R)
        dr_dt = self.dr_dt(S, I, R)
        return np.array([ds_dt, di_dt, dr_dt])